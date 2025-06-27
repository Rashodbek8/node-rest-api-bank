const accountRepository = require('../repositories/accountRepository');

exports.getAllAccounts = async () => accountRepository.getAllAccounts();

exports.getAccountById = async (id) => accountRepository.getAccountById(id);

exports.createAccount = async (data) => accountRepository.createAccount(data);

exports.updateAccount = async (id, data) => accountRepository.updateAccount(id, data);

exports.deleteAccount = async (id) => accountRepository.deleteAccount(id);