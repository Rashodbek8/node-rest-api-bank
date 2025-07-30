const Queue = require('bull');

const redisConfig = {
  host: "127.0.0.1",
  port: 6379,
};

exports.redisConfig = redisConfig;
exports.createQueue = (name) => new Queue(name, { redis: redisConfig });