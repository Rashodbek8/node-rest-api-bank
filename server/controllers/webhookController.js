const { TransactionStatus, WebhookStatus } = require("@prisma/client");
const prisma = require("../prismaClient/prismaClient");

exports.handleTransactionWebhook = async (req, res, next) => {
  const { transactionId, status, timestamp } = req.body;

  if (!transactionId || !status || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("📥 Webhook received:", req.body);

  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus[status],
      },
    });

    await prisma.webhookLog.create({
      data: {
        transactionId,
        status: WebhookStatus.delivered,
        payload: req.body,
      },
    });

    return res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    console.error("❌ Error processing webhook:", err.message);

    try {
      await prisma.webhookLog.create({
        data: {
          transactionId,
          status: WebhookStatus.retrying,
          payload: req.body,
          errorMessage: err.message,
        },
      });
    } catch (logErr) {
      console.error("❌ Failed to log retrying status:", logErr.message);
    }

    next(err);
  }
};