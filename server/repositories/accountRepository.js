let accounts = [
    { id: 1, userId: 1, accountNumber: "UZ1234567890", balance: 2500 },
    { id: 2, userId: 2, accountNumber: "UZ9876543210", balance: 1000 }
];

exports._accounts = accounts;

exports.getAllAccounts = () => accounts;

exports.getAccountById = (id) => accounts.find(a => a.id === id);

exports.createAccount = (data) => {
    const newAcc = { id: Date.now(), ...data };
    accounts.push(newAcc);
    return newAcc;
};

exports.updateAccount = (id, data) => {
    const index = accounts.findIndex(a => a.id === id);
    if (index === -1) return null;
    accounts[index] = { ...accounts[index], ...data };
    return accounts[index];
};

exports.deleteAccount = (id) => {
    const index = accounts.findIndex(a => a.id === id);
    if (index === -1) return null;
    return accounts.splice(index, 1)[0];
};

exports.deleteAccountsByUserId = (userId) => {
    const before = accounts.length;
    accounts = accounts.filter(acc => acc.userId !== userId);
    exports._accounts = accounts;
    return before - accounts.length;
};
