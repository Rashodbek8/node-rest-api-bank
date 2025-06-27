const userRepository = require('../repositories/userRepository');
const accountRepository = require('../repositories/accountRepository');

exports.getAllUsers = async () => userRepository.getAllUsers();

exports.getUserById = async (id) => userRepository.getUserById(id);

exports.createUser = async (data) => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw { status: 400, message: "Email already exists" };

    const newUser = await userRepository.createUser(data);
    const accountData = {
        userId: newUser.id,
        accountNumber: "UZ" + Math.floor(Math.random() * 10000000000),
        balance: 0
    };
    await accountRepository.createAccount(accountData);
    return newUser;
};

exports.updateUser = async (id, data) => userRepository.updateUser(id, data);

exports.deleteUser = async (id) => userRepository.deleteUser(id);