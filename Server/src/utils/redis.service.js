const Redis = require("ioredis");
const config = require("../config/config");

const redis = new Redis({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis is connected");
});

// const setData = async () => {
//   await redis.set("foo", "bar");
//   const result = await redis.get("foo");
//   console.log(result);
// };

// setData()

module.exports = redis;
