const accountService = require('../services/accountService');

exports.getAccounts = async (req, res, next) => {
    try {
        const acc = await accountService.getAllAccounts();
        res.json(acc);  
    } catch (err) {
        next(err);
    }
};

exports.getAccountById = async (req, res, next) => {
    try {
        const acc = await accountService.getAccountById(parseInt(req.params.id));
        if (!acc) throw { status: 404, message: "Account not found" };
        res.json(acc);
    } catch (err) {
        next(err);
    }
};

exports.createAccount = async (req, res, next) => {
    try {
        const newAcc = await accountService.createAccount(req.body);
        res.status(201).json({ message: "Account created", account: newAcc });
    } catch (err) {
        next(err);
    }
};

exports.updateAccount = async (req, res, next) => {
    try {
        const updated = await accountService.updateAccount(parseInt(req.params.id), req.body);
        if (!updated) throw { status: 404, message: "Account not found" };
        res.json({ message: "Account updated", account: updated });
    } catch (err) {
        next(err);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        const deleted = await accountService.deleteAccount(parseInt(req.params.id));
        if (!deleted) throw { status: 404, message: "Account not found" };
        res.json({ message: "Account deleted", account: deleted });
    } catch (err) {
        next(err);
    }
};
