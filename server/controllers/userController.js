const userService = require('../services/userService');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        if (!user) throw { status: 404, message: "User not found" };
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: "User created", user: newUser });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = { ...req.body };
        delete data.id;

        const updated = await userService.updateUser(id, data);
        if (!updated) throw { status: 404, message: "User not found" };

        res.json({ message: "User updated", user: updated });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const deleted = await userService.deleteUser(parseInt(req.params.id));
        if (!deleted) throw { status: 404, message: "User not found" };
        res.json({ message: "User deleted", user: deleted });
    } catch (err) {
        next(err);
    }
};