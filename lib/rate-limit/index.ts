import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  identifier: string;
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async check(): Promise<{ success: boolean; remaining: number; reset: number }> {
    if (!redis) {
      // If Redis is not configured, allow all requests (development mode)
      console.warn("Redis not configured, rate limiting disabled");
      return { success: true, remaining: this.config.maxRequests, reset: Date.now() };
    }

    const key = `rate-limit:${this.config.identifier}`;
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    try {
      // Remove old entries
      await redis.zremrangebyscore(key, 0, windowStart);

      // Count requests in current window
      const count = await redis.zcount(key, windowStart, now);

      if (count >= this.config.maxRequests) {
        // Get the oldest request timestamp to calculate reset time
        const oldest = await redis.zrange(key, 0, 0, { withScores: true });
        const resetTime = oldest.length > 0 && oldest[0] && typeof oldest[0] === 'object' && 'score' in oldest[0]
          ? (oldest[0].score as number) + this.config.windowMs 
          : now + this.config.windowMs;

        return {
          success: false,
          remaining: 0,
          reset: resetTime,
        };
      }

      // Add current request
      await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` });
      await redis.expire(key, Math.ceil(this.config.windowMs / 1000));

      return {
        success: true,
        remaining: this.config.maxRequests - count - 1,
        reset: now + this.config.windowMs,
      };
    } catch (error) {
      console.error("Rate limit check error:", error);
      // On error, allow the request
      return { success: true, remaining: this.config.maxRequests, reset: now };
    }
  }
}

// Helper functions for common rate limits
export function createIPRateLimit(ip: string) {
  return new RateLimiter({
    identifier: `ip:${ip}`,
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
  });
}

export function createRegistrationRateLimit(ip: string) {
  return new RateLimiter({
    identifier: `registration:${ip}`,
    maxRequests: 1,
    windowMs: 5 * 60 * 1000, // 5 minutes
  });
}

export function createSMSRateLimit(phone: string) {
  return new RateLimiter({
    identifier: `sms:${phone}`,
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  });
}

export function createEmailRateLimit(email: string) {
  return new RateLimiter({
    identifier: `email:${email}`,
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  });
}

