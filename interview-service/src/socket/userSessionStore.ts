import RedisCacheService from '../redis/redisCacheService';

interface userSessionResponse {
  sessionId?: string;
}

export default class UserSessionStore {
  private readonly redisService: RedisCacheService;

  constructor() {
    this.redisService = new RedisCacheService();
  }

  async findUserSession(userId: string): Promise<userSessionResponse> {
    const data = await this.redisService.get(`user:${userId}`);
    if (data) {
      console.log(`${userId} is in a session ${data}`);
      return { sessionId: data };
    }

    console.log(`${userId} is not in a session`);
    return {};
  }

  async deleteUserSession(userId: string): Promise<void> {
    console.log('deleting session for user:', userId);
    await this.redisService.delete(`user:${userId}`);
  }
}
