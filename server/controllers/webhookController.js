const prisma = require("../prismaClient/prismaClient");

exports.handleTransactionWebhook = async (req, res, next) => {
    try{
        const {transactionId, status, timestamp} = req.body;
        if(!transactionId || !status || !timestamp){
            return res.status(404).json({error: "Missing required fields"});
        }
        console.log("📥Webhook received:", req.body);

        res.status(200).json({message: "Webhook received"});
    }catch(err){
        next(err);
    }
};