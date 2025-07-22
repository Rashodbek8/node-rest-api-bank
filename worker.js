const createQueue = require("./server/config/queue");
const processSendTransaction = require("./server/jobs/sendTransactionJob");

const sendTransactionQueue = createQueue("send-transaction");

sendTransactionQueue.process("send-transaction", processSendTransaction);

sendTransactionQueue.on("active", (job) => {
  console.log("▶️ Job is active:", job.id);
});

sendTransactionQueue.on("completed", (job) => {
  console.log("✅ Job is done:", job.id);
});

sendTransactionQueue.on("failed", (job, err) => {
  console.log("❌ Job failed", job.id, err.message);
});

console.log("🚀 Worker is running...");