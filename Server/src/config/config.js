const _config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT || 3000,
  JWT: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXPIRES,

  AI_SECRET: process.env.AI_SECRET_KEY,

  JUDGEO_API_KEY: process.env.JUDGEO_API_KEY,
  JUDGEO_HOST: process.env.JUDGEO_HOST,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

const config = Object.freeze(_config);
module.exports = config;
