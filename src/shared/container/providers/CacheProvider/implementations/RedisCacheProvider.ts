import Redis, {Redis as IRedis} from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from "../models/ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
  private client: IRedis;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async recover(key: string): Promise<string | null> {
    return this.client.get(key);
  }
  public async invalidate(key: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
