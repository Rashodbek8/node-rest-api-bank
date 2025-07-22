const transactionService = require("../services/transactionService");

exports.createTransaction = async (req, res, next) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    const transaction = await transactionService.createTransaction({
      fromAccountId,
      toAccountId,
      amount,
    });

    res.status(201).json({
      message: "Transaction successful",
      transaction,
    });

  } catch (err) {
    if (err.status) {
      return next(err);
    }
    console.error("❌ Transaction failed:", err.message || err);

    return next({
      status: 500,
      message: "Transaction failed due to server error",
    });
  }
};
