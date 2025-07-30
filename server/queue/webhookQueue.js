const Queue = require("bull");
const { redisConfig } = require("../config/queue");

const webhookQueue = new Queue("webhookQueue", {
  redis: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: { 
      type: "exponential",
      delay: 1000 
    },
    removeOnComplete: true
  }
});

console.log("🔄 Webhook queue initialized");
module.exports = webhookQueue;