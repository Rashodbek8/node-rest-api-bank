const prisma = require("../prismaClient/prismaClient");

exports.getAllAccounts = async () => {
    return await prisma.account.findMany();
};
exports.getAccountById = async (id) => {
    return await prisma.account.findUnique({
        where: {id},
    });
};
exports.createAccount = async (data) => {
    return await prisma.account.create({
        data,
    });
};
exports.updateAccount = async (id, data) => {
    return await prisma.account.update({
        where: {id},
        data,
    });
};
exports.deleteAccount = async (id) => {
    return await prisma.account.delete({
        where: {id}
    });
};
exports.deleteAccountByUserId = async (userId) => {
    return await prisma.account.deleteMany({
        where: {userId}
    });
};    