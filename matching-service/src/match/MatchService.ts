import { v4 as uuidv4 } from 'uuid';
import RedisCacheService from '../redis/redisCacheService';
import MatchResponse from './matchResponse';

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
      console.log(`${id} has been matched with ${matchDetails.partner}`);
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
      map[id] = { partner: unmatchedId, sessionId };
      map[unmatchedId] = { partner: id, sessionId };
      await this.redisService.set(key, JSON.stringify(map));
      console.log(`Successfully matched ${id} with ${unmatchedId}`);
      return {
        status: true,
        id,
        partnerId: unmatchedId,
        sessionId,
        difficulty,
        language
      };
    }

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

  async createMatch(id: string, difficulty: string, language: string) {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = data !== null ? JSON.parse(data) : {};
    console.log(map);
    if (!(id in map)) {
      map[id] = null;
      await this.redisService.set(key, JSON.stringify(map));
    }
    console.log(`Added ${id} to match queue for ${difficulty}_${language}`);
  }

  async deleteMatch(id: string, difficulty: string, language: string) {
    const key = `${difficulty}_${language}`;
    const data = await this.redisService.get(key);
    const map = JSON.parse(data || '{}');
    // Check if partner exists
    if (map[id] !== null) {
      const partnerId = map[id].partner;
      delete map[partnerId];
    }

    delete map[id];
    await this.redisService.set(key, JSON.stringify(map));
  }
}
