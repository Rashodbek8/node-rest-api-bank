const createQueue = require("../server/config/queue");
const processWebhook = require("../server/jobs/sendWebhookJob");

const webhookQueue = createQueue("webhookQueue");

webhookQueue.process("send-webhook", processWebhook);

webhookQueue.on("active", (job) => {
  console.log("📤 Sending webhook job started:", job.id);
});

webhookQueue.on("completed", (job) => {
  console.log("✅ Webhook job completed:", job.id);
});

webhookQueue.on("failed", (job, err) => {
  console.log("❌ Webhook job failed:", job.id, err.message);
});