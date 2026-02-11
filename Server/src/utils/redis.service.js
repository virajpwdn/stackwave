const Redis = require("ioredis");
const config = require("../config/config");

const redis = new Redis({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,

  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis is connected");
});

module.exports = redis;