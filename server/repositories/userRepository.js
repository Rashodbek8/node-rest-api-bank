let users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@gmail.com",
        password: "hashed password",
        role: "admin"
    }

];

let accounts = require('./accountRepository')._accounts;

exports.getAllUsers = () => users;

exports.getUserById = (id) => users.find(u => u.id === id);

exports.findByEmail = (email) => users.find(u => u.email === email);

exports.createUser = (data) => {
    const newUser = { id: Date.now(), ...data };
    users.push(newUser);
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

    const accountRepo = require('./accountRepository');
    accountRepo.deleteAccountsByUserId(id);
    return removedUser;
};
