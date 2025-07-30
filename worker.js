const { createQueue } = require(".//server/config/queue");
const processSendTransaction = require("./server/jobs/sendTransactionJob");

const sendTransactionQueue = createQueue("send-transaction");

sendTransactionQueue.process("send-transaction", processSendTransaction);

sendTransactionQueue.on("active", (job) => {
  console.log(`▶️ Job ${job.id} started`);
});

sendTransactionQueue.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

sendTransactionQueue.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

console.log("🚀 Transaction worker started");