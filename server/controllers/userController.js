const userService = require('../services/userService');

exports.getUsers = (req, res) => {
    res.json(userService.getAllUsers());
};

exports.getUserById = (req, res, next) => {
    try {
        const user = userService.getUserById(parseInt(req.params.id));
        if (!user) throw { status: 404, message: "User not found" };
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.createUser = (req, res, next) => {
    try {
        const newUser = userService.createUser(req.body);
        res.status(201).json({ message: "User created", user: newUser });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = (req, res, next) => {
    try {
        const updated = userService.updateUser(parseInt(req.params.id), req.body);
        if (!updated) throw { status: 404, message: "User not found" };
        res.json({ message: "User updated", user: updated });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = (req, res, next) => {
    try {
        const deleted = userService.deleteUser(parseInt(req.params.id));
        if (!deleted) throw { status: 404, message: "User not found" };
        res.json({ message: "User deleted", user: deleted });
    } catch (err) {
        next(err);
    }
};