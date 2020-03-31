import Koa from 'koa';
import Grounded from '../lib';

import dotenv from 'dotenv';

const appA = new Koa();

// Load environment variables
dotenv.config();

const RateLimiter = Grounded({
  ratelimit: 10,
  globalEXP: 1 * 10 * 1000 * 1000,
  timeout: 2000,
  localThreshold: 10,
  cacheSize: 500,
  dbStr: process.env.REDIS_HOST,
  verbose: true,
});

const PingPong = async (ctx: Koa.Context) => {
  ctx.body = 'Pong!';
};

// Grounded Middleware
appA.use(RateLimiter);

// Sample Output
appA.use(PingPong);

// Using IPv4 instead of IPv6;
appA.listen(4000, '0.0.0.0');
// tslint:disable-next-line: no-console
console.log('listening on port 4000');