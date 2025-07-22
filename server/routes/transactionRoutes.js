const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.createTransaction);

const {sendTransfer} = require("../services/externalBankService");

router.post("/transfers/external", async (req, res, next) => {
    try{
        const result = await sendTransfer(req.body);
        res.status(200).json({message: "Перевод отправлен", result});
    } catch(err){
        next(err);
    }
});

module.exports = router;