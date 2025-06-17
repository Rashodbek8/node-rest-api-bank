let users = [
    { id: 1, name: "Alice", email: "alice@mail.com", password: "pass1" },
    { id: 2, name: "Bob", email: "bob@mail.com", password: "pass2" }
];
let accounts = require('./accountService')._accounts;

exports.getAllUsers = () => users;

exports.getUserById = (id) => users.find(u => u.id === id);

exports.createUser = (data) => {
    const { name, email, password } = data;
    if (users.find(u => u.email === email)) {
        throw { status: 400, message: "Email already exists" };
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);

    const newAccount = {
        id: Date.now() + 1,
        userId: newUser.id,
        accountNumber: "UZ" + Math.floor(Math.random() * 10000000000),
        balance: 0
    };
    accounts.push(newAccount);

    return newUser;
};

exports.updateUser = (id, data) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
};

exports.deleteUser = (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const removedUser = users.splice(index, 1)[0];

    const accountService = require('./accountService');
    accountService.deleteAccountsByUserId(id);

    return removedUser;
};
