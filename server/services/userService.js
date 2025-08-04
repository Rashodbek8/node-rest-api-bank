const userRepository = require('../repositories/userRepository');
const accountRepository = require('../repositories/accountRepository');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your_32_byte_key_here_123456789012';
const IV_LENGTH = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

exports.getAllUsers = async () => userRepository.getAllUsers();

exports.getUserById = async (id) => userRepository.getUserById(id);

exports.createUser = async (data) => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw { status: 400, message: "Email already exists" };

    const saltRounds = 10;
    const hashedPin = await bcrypt.hash(data.pin, saltRounds);

    const newUser = await userRepository.createUser({
        ...data,
        pin: hashedPin
    });

    const plainIban = "UZ" + Math.floor(Math.random() * 10000000000);
    const encryptedIban = encrypt(plainIban);

    const accountData = {
        userId: newUser.id,
        iban: encryptedIban,
        balance: 0
    };

    await accountRepository.createAccount(accountData);
    return newUser;
};

exports.updateUser = async (id, data) => {
    delete data.id;

    if (data.pin) {
        const saltRounds = 10;
        data.pin = await bcrypt.hash(data.pin, saltRounds);
    }

    return userRepository.updateUser(id, data);
};

exports.deleteUser = async (id) => {
    await accountRepository.deleteAccountByUserId(id);
    return userRepository.deleteUser(id);
};

exports.comparePin = async (plainPin, hashedPin) => {
    return bcrypt.compare(plainPin, hashedPin);
};

exports.decryptIban = (encryptedIban) => {
    return decrypt(encryptedIban);
};