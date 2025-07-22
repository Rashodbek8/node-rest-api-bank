const prisma = require("../prismaClient/prismaClient");
const createQueue = require("../config/queue");

const sendTransactionQueue = createQueue("send-transaction");

exports.createTransaction = async ({ fromAccountId, toAccountId, amount }) => {
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
        data: { balance: { decrement: amount } },
      });

      await tx.account.update({
        where: { id: toAccountId },
        data: { balance: { increment: amount } },
      });

      return tx.transaction.create({
        data: {
          fromAccountId,
          toAccountId,
          amount,
          status: "confirmed",
        },
      });
    });

    await sendTransactionQueue.add("send-transaction", { txId: transaction.id }, {attempts: 3});
    console.log("📤Adding task to queue");

    return transaction;

  } catch (err) {
    console.error("💥 Transaction error:", err.message || err);

    try {
      await prisma.transaction.create({
        data: {
          fromAccountId,
          toAccountId,
          amount,
          status: "failed",
        },
      });
    } catch (logErr) {
      console.error("⚠️ Failed to log failed transaction:", logErr.message || logErr);
    }

    throw err;
  }
};