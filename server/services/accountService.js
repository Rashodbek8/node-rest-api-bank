const crypto = require('crypto');
const accountRepository = require('../repositories/accountRepository');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

exports.createAccount = async (data) => {
  if (data.iban) data.iban = encrypt(data.iban);
  if (data.pin) data.pin = encrypt(data.pin.toString());
  return accountRepository.createAccount(data);
};

exports.getAccountById = async (id) => {
  const account = await accountRepository.getAccountById(id);
  if (account?.iban) account.iban = decrypt(account.iban);
  if (account?.pin) account.pin = decrypt(account.pin);
  return account;
};

exports.getAllAccounts = async () => {
  const accounts = await accountRepository.getAllAccounts();
  return accounts.map((account) => ({
    ...account,
    iban: account.iban ? decrypt(account.iban) : null,
    pin: account.pin ? decrypt(account.pin) : null,
  }));
};

exports.updateAccount = async (id, data) => {
  if (data.iban) data.iban = encrypt(data.iban);
  if (data.pin) data.pin = encrypt(data.pin.toString());
  return accountRepository.updateAccount(id, data);
};

exports.deleteAccount = async (id) => accountRepository.deleteAccount(id);