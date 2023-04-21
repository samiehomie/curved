import IORedis, { Redis } from 'ioredis';

function fixUrl(url: string) {
  if (!url) {
    return '';
  }
  if (url.startsWith('redis://') && !url.startsWith('redis://:')) {
    return url.replace('redis://', 'redis://:');
  }
  if (url.startsWith('rediss://') && !url.startsWith('rediss://:')) {
    return url.replace('rediss://', 'rediss://:');
  }
  return url;
}

class ClientRedis {
  static instance: Redis;
  constructor() {
    throw new Error('Use Singleton.getInstance()');
  }
  static getInstance(): Redis | null {
    if (!ClientRedis.instance) {
      ClientRedis.instance = new IORedis({
        host: 'redis-15164.c290.ap-northeast-1-2.ec2.cloud.redislabs.com',
        port: 15164,
        password: process.env.REDIS_PASSWORD,
      });
    }
    return ClientRedis.instance;
  }
}

export default ClientRedis.getInstance();
