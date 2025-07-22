const prisma = require("../prismaClient/prismaClient");

module.exports = async (job) => {
    const { txId } = job.data;
    console.log(`📨 Processing transaction with ID: ${txId}`);

    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: txId },
        });

        if (!transaction) {
            throw new Error("Transaction not found");
        }

        if (transaction.status === "confirmed" || transaction.status === "failed") {
            console.log(`⚠️ Transaction already processed: ${transaction.status}`);
            return;
        }

        console.log("🔄 Updating transaction status to confirmed");

        await prisma.transaction.update({
            where: { id: txId },
            data: { status: "confirmed" },
        });

        console.log("✅ Transaction confirmed");
    } catch (err) {
        console.error("❌ Error in worker:", err.message);

        try {
            await prisma.transaction.update({
                where: { id: txId },
                data: { status: "failed" },
            });
        } catch (updateErr) {
            console.error("❌ Failed to mark transaction as failed:", updateErr.message);
        }
        throw err;
    }
};