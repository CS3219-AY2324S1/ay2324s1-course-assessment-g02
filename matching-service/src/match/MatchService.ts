import { v4 as uuidv4 } from 'uuid';
import RedisCacheService from '../redis/redisCacheService';
import MatchResponse from './matchResponse';
import getRandomQuestion from '../question/question';

export default class MatchService {
  private readonly redisService: RedisCacheService;

  constructor() {
    this.redisService = new RedisCacheService();
  }

  async getMatch(
    userId: string,
    difficulty: string,
    language: string,
    id: number
  ) {
    console.log('creating match', userId, difficulty, language);
    await this.createMatch(userId, difficulty, language, id);
    return this.findMatch(userId, difficulty, language, id);
  }

  async findMatch(
    userId: string,
    difficulty: string,
    language: string,
    id: number
  ): Promise<MatchResponse> {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = JSON.parse(data || '{}'); // Initialize to an empty object if data is null
    console.log('map', map[userId]);

    if (map[userId] !== null && map[userId].partner !== null) {
      const matchDetails = map[userId];
      console.log(
        `${userId} is already in a session with ${matchDetails.partner}`
      );
      return {
        status: true,
        id: userId,
        partnerId: matchDetails.partner,
        sessionId: matchDetails.sessionId,
        difficulty,
        language
      };
    }

    const unmatchedId = Object.keys(map).find(
      (otherId) => otherId !== userId && map[otherId].partner === null
    );
    console.log('unmatchedId', unmatchedId);

    if (unmatchedId) {
      const sessionId = MatchService.generateSessionId();
      const question = await MatchService.getRandomQuestion(difficulty);

      if (question === null) {
        throw new Error('Error getting random question');
      }
      const id1 = map[userId].id;
      const id2 = map[unmatchedId].id;

      map[userId] = { partner: unmatchedId, sessionId };
      map[unmatchedId] = {
        partner: userId,
        sessionId
      };
      await this.redisService.set(key, JSON.stringify(map));
      console.log(`Successfully matched ${userId} with ${unmatchedId}`);

      // Send both users to a `user:${userId}`:sessionId in redis for lookup
      console.log(`Setting user:${userId} to ${sessionId}`);
      await this.redisService.set(`user:${userId}`, sessionId);
      console.log(`Setting user:${unmatchedId} to ${sessionId}`);
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
            id1: id1,
            id2: id2,
            userId1: userId,
            userId2: unmatchedId,
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
        id: userId,
        partnerId: unmatchedId,
        sessionId,
        difficulty,
        language
      };
    }

    console.log(map);

    return {
      status: false,
      id: userId,
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

  async createMatch(
    userId: string,
    difficulty: string,
    language: string,
    id: number
  ) {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = data !== null ? JSON.parse(data) : {};
    if (!(userId in map)) {
      map[userId] = { partner: null, id: id };
      await this.redisService.set(key, JSON.stringify(map));
      console.log(
        `Added ${userId} to match queue for ${difficulty}_${language}`
      );
    }
  }

  async deleteMatch(userId: string, difficulty: string, language: string) {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = JSON.parse(data || '{}');
    // Check if partner exists
    if (map[userId] !== null) {
      const { partnerId } = map[userId];
      delete map[partnerId];
    }

    delete map[userId];
    await this.redisService.set(key, JSON.stringify(map));
  }
}
