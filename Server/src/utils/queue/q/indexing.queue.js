const { Queue } = require("bullmq");
const redis = require("../../redis.service");

const indexingQueue = new Queue("document-indexing", { connection: redis });

module.exports = indexingQueue;
