const prisma = require("../prismaClient/prismaClient");
const { createQueue } = require("../config/queue");
const webhookQueue = require("../queue/webhookQueue");

const sendTransactionQueue = createQueue("send-transaction");

exports.createTransaction = async ({ fromAccountId, toAccountId, amount }) => {
  if (amount <= 0) {
    throw { status: 400, message: "Amount must be positive" };
  }

  const from = await prisma.account.findUnique({ where: { id: fromAccountId } });
  const to = await prisma.account.findUnique({ where: { id: toAccountId } });

  if (!from || !to) {
    throw { status: 404, message: "One or both accounts not found" };
  }

  if (from.balance < amount) {
    throw { status: 400, message: "Insufficient funds" };
  }

  try {
    const transaction = await prisma.$transaction(async (tx) => {
      await tx.account.update({ 
        where: { id: fromAccountId },
        data: { balance: { decrement: amount } }
      });

      await tx.account.update({
        where: { id: toAccountId },
        data: { balance: { increment: amount } }
      });

      return tx.transaction.create({
        data: {
          fromAccountId,
          toAccountId,
          amount,
          status: "confirmed"
        }
      });
    });

    await sendTransactionQueue.add(
      "send-transaction", 
      { txId: transaction.id }, 
      { attempts: 3 }
    );
    console.log(`📤 Added transaction ${transaction.id} to queue`);

    await webhookQueue.add(
      "send-webhook",
      {
        transactionId: transaction.id,
        status: transaction.status,
      },
      {
        attempts: 3,
        backoff: 1000,
      }
    );
    console.log(`🌐 Webhook job queued for transaction ${transaction.id}`);

    return transaction;

  } catch (err) {
    console.error(`💥 Transaction error: ${err.message}`);

    try {
      const failedTransaction = await prisma.transaction.create({
        data: {
          fromAccountId,
          toAccountId,
          amount,
          status: "failed"
        }
      });

      await prisma.webhookLog.create({
        data: {
          transactionId: failedTransaction.id,
          status: "failed",
          errorMessage: err.message
        }
      });

    } catch (logErr) {
      console.error(`⚠️ Failed to log failed transaction: ${logErr.message}`);
    }

    throw err;
  }
};