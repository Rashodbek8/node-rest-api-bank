const accountService = require('../services/accountService');

exports.getAccounts = (req, res) => {
    res.json(accountService.getAllAccounts());
};

exports.getAccountById = (req, res, next) => {
    try {
        const acc = accountService.getAccountById(parseInt(req.params.id));
        if (!acc) throw { status: 404, message: "Account not found" };
        res.json(acc);
    } catch (err) {
        next(err);
    }
};

exports.createAccount = (req, res, next) => {
    try {
        const newAcc = accountService.createAccount(req.body);
        res.status(201).json({ message: "Account created", account: newAcc });
    } catch (err) {
        next(err);
    }
};

exports.updateAccount = (req, res, next) => {
    try {
        const updated = accountService.updateAccount(parseInt(req.params.id), req.body);
        if (!updated) throw { status: 404, message: "Account not found" };
        res.json({ message: "Account updated", account: updated });
    } catch (err) {
        next(err);
    }
};

exports.deleteAccount = (req, res, next) => {
    try {
        const deleted = accountService.deleteAccount(parseInt(req.params.id));
        if (!deleted) throw { status: 404, message: "Account not found" };
        res.json({ message: "Account deleted", account: deleted });
    } catch (err) {
        next(err);
    }
};