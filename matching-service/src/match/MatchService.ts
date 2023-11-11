import { v4 as uuidv4 } from 'uuid';
import RedisCacheService from '../redis/redisCacheService';
import MatchResponse from './matchResponse';
import getRandomQuestion from '../question/question';

export default class MatchService {
  private readonly redisService: RedisCacheService;

  constructor() {
    this.redisService = new RedisCacheService();
  }

  async getMatch(id: string, difficulty: string, language: string) {
    await this.createMatch(id, difficulty, language);
    return this.findMatch(id, difficulty, language);
  }

  async findMatch(
    id: string,
    difficulty: string,
    language: string
  ): Promise<MatchResponse> {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = JSON.parse(data || '{}'); // Initialize to an empty object if data is null

    if (map[id] !== null) {
      const matchDetails = map[id];
      console.log(`${id} is already in a session with ${matchDetails.partner}`);
      return {
        status: true,
        id,
        partnerId: matchDetails.partner,
        sessionId: matchDetails.sessionId,
        difficulty,
        language
      };
    }

    const unmatchedId = Object.keys(map).find(
      (otherId) => otherId !== id && map[otherId] === null
    );

    if (unmatchedId) {
      const sessionId = MatchService.generateSessionId();
      const question = await MatchService.getRandomQuestion(difficulty);

      if (question === null) {
        throw new Error('Error getting random question');
      }
      map[id] = { partner: unmatchedId, sessionId };
      map[unmatchedId] = { partner: id, sessionId };
      await this.redisService.set(key, JSON.stringify(map));
      console.log(`Successfully matched ${id} with ${unmatchedId}`);

      // Send both users to a `user:${userId}`:sessionId in redis for lookup
      await this.redisService.set(`user:${id}`, sessionId);
      await this.redisService.set(`user:${unmatchedId}`, sessionId);

      // Create a session in redis to be shared with sockets
      const sessionCreated = await this.redisService.get(
        `session:${sessionId}`
      );

      if (sessionCreated == null) {
        console.log('questionId', question.id);
        await this.redisService.set(
          `session:${sessionId}`,
          JSON.stringify({
            status: true,
            id1: id,
            id2: unmatchedId,
            sessionId,
            questionId: question.id,
            startTime: Date.now(),
            difficulty: difficulty as string,
            language: language as string
          })
        );
      }
      return {
        status: true,
        id,
        partnerId: unmatchedId,
        sessionId,
        difficulty,
        language
      };
    }

    console.log(map);

    return {
      status: false,
      id,
      difficulty,
      language
    };
  }

  static generateSessionId(): string {
    return uuidv4();
  }

  static async getRandomQuestion(difficulty: string) {
    try {
      const response = await getRandomQuestion(difficulty);
      const question = response.data;

      // Optionally, you can also filter or manipulate the question based on the 'language' parameter
      // For example:
      // if (language === 'JavaScript') {
      //   // Do something specific for JavaScript questions
      // }

      return question;
    } catch (error) {
      console.error('Error getting random question:', error);
      throw error;
    }
  }

  async checkUser(id: string) {
    const key = `user:${id}`;
    const data = await this.redisService.get(key);
    if (data) {
      return data;
    }
    return '';
  }

  async createMatch(id: string, difficulty: string, language: string) {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = data !== null ? JSON.parse(data) : {};
    if (!(id in map)) {
      map[id] = null;
      await this.redisService.set(key, JSON.stringify(map));
      console.log(`Added ${id} to match queue for ${difficulty}_${language}`);
    }
  }

  async deleteMatch(id: string, difficulty: string, language: string) {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = JSON.parse(data || '{}');
    // Check if partner exists
    if (map[id] !== null) {
      const { partnerId } = map[id];
      delete map[partnerId];
    }

    delete map[id];
    await this.redisService.set(key, JSON.stringify(map));
  }
}
