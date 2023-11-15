import RedisCacheService from '../redis/redisCacheService';
import { Message, SessionResponse } from './sessionResponse';
import {
  createQuestionAttempt,
  attemptSchema
} from '../questions/questionsService';

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

  async submitSessionCode(sessionId: string, code: string): Promise<void> {
    const sessionData = await this.findSession(sessionId);

    if (sessionData) {
      const language = sessionData.language;
      const difficulty = sessionData.difficulty;
      // Store question attempt in database
      const payload: attemptSchema = {
        questionId: sessionData.questionId,
        userId1: sessionData.id1,
        userId2: sessionData.id2,
        code: sessionData.code,
        language: sessionData.language
      };
      console.log('Saving question attempt:', payload);
      try {
        const saveQuestionResponse = await createQuestionAttempt(payload);
        if (saveQuestionResponse && 'error' in saveQuestionResponse) {
          console.error(
            'Error storing question attempt:',
            saveQuestionResponse.error
          );
        } else {
          console.log('Successfully stored question attempt');
        }
      } catch (error) {
        console.error('Unexpected error storing question attempt:', error);
      }
      // Handle sessionData deletion in redis queue
      if (difficulty !== undefined && language !== undefined) {
        const languageDifficultyData = await this.redisService.get(
          `${difficulty}_${language}`
        );
        if (languageDifficultyData) {
          const languageDifficultyMap = JSON.parse(languageDifficultyData);
          delete languageDifficultyMap[sessionData.id1];
          delete languageDifficultyMap[sessionData.id2];
          await this.redisService.set(
            `${difficulty}_${language}`,
            JSON.stringify(languageDifficultyMap)
          );
        }
      }
      await this.redisService.delete(`user:${sessionData.userId1}`);
      console.log('User:session deleted:', `user:${sessionData.userId1}`);
      await this.redisService.delete(`user:${sessionData.userId2}`);
      console.log('User:session deleted:', `user:${sessionData.userId2}`);
    }
    await this.redisService.delete(`session:${sessionId}`);
    console.log('Session deleted:', `session:${sessionId}`);
  }
}
