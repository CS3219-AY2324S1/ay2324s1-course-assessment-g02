import RedisCacheService from '../redis/redisCacheService';
import { Message, SessionResponse } from './sessionResponse';

export default class sessionStore {
  private readonly redisService: RedisCacheService;

  constructor() {
    this.redisService = new RedisCacheService();
  }

  async findSession(sessionId: string): Promise<SessionResponse | void> {
    const data = await this.redisService.get(`session:${sessionId}`);
    if (data) {
      console.log(`Retrieved session: ${sessionId}`);
      return JSON.parse(data);
    }

    console.log(`Session: ${sessionId} does not exist`);
  }

  async saveSession(
    sessionId: string,
    session: SessionResponse
  ): Promise<void> {
    const data = await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(session)
    );
  }

  async getQuestionId(sessionId: string): Promise<number | void> {
    const data = await this.findSession(sessionId);
    if (data) {
      if (!data.questionId) {
        data.questionId = 0;
      }
      return data.questionId;
    }
  }

  async getSessionMessages(sessionId: string): Promise<Message[] | void> {
    const data = await this.findSession(sessionId);
    if (data) {
      if (!data.messages) {
        data.messages = [];
      }
      return data.messages;
    }
  }

  async saveNewSessionMessage(
    sessionId: string,
    message: Message
  ): Promise<void> {
    const data = await this.findSession(sessionId);
    if (data) {
      console.log(
        `💬Saving new message to session: ${sessionId}, message: ${message}`
      );
      if (!data.messages) {
        data.messages = [];
      }
      const newData = { ...data, messages: [...data.messages, message] };
      await this.redisService.set(
        `session:${sessionId}`,
        JSON.stringify(newData)
      );
    }
  }

  async getSessionCode(sessionId: string): Promise<string | void> {
    const data = await this.findSession(sessionId);
    if (data) {
      if (!data.code) {
        data.code = '';
      }
      return data.code;
    }
  }

  async saveSessionCode(sessionId: string, code: string): Promise<void> {
    const data = await this.findSession(sessionId);
    if (data) {
      console.log(`💻Saving code to session: ${sessionId}, code: ${code}`);
      const newData = { ...data, code: code };
      await this.redisService.set(
        `session:${sessionId}`,
        JSON.stringify(newData)
      );
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    console.log('Deleting session:', `session:${sessionId}`);
    await this.redisService.delete(`session:${sessionId}`);
  }
}
