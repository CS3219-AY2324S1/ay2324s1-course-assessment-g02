import { createClient } from 'redis';
import dotenv from 'dotenv';

export default class RedisCacheService {
  private client: ReturnType<typeof createClient>;

  constructor() {
    dotenv.config();
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    });

    this.client
      .connect()
      .then(() => {
        console.log('Connected to Redis');
      })
      .catch((error) => {
        console.error('Failed to connect to Redis:', error);
      });

    this.client.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
