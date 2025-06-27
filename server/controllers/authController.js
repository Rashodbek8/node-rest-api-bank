const authService = require("../services/authService");

exports.register = async(req, res, next) => {
    try{
        const user = await authService.register(req.body);
        res.status(201).json({message: "User registred", user});
    } catch(err){
        next(err)
    }
};

exports.login = async (req, res, next) => {
    try {
        const { token, user } = await authService.login(req.body);
        res.json({ message: "Login successful", token, user });
    } catch (err) {
        next(err);
    }
};