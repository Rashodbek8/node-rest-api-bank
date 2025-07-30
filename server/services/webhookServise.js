const Queue = require("bull");
const { redisConfig } = require("../config/queue");

const webhookQueue = require("../queue/webhookQueue");
const prisma = require("../prismaClient/prismaClient");

exports.sendWebhook = async (transactionId) => {
  const callbackUrl = "http://localhost:4000/webhook/transaction";

  try {
    await webhookQueue.add("process-webhook", {
      transactionId,
      callbackUrl
    });

    await prisma.webhookLog.create({
      data: {
        transactionId,
        status: "pending",
        payload: { transactionId, callbackUrl }
      }
    });

    console.log(`📤 Webhook queued for transaction ${transactionId}`);
    return { queued: true };

  } catch (error) {
    console.error(`❌ Failed to queue webhook: ${error.message}`);
    throw error;
  }
};