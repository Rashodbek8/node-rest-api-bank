const prisma = require("../prismaClient/prismaClient");

exports.getAllAccounts = () => prisma.account.findMany();

exports.getAccountById = (id) => prisma.account.findUnique({where: {id}});

exports.createAccount = (data) => prisma.account.create({data});

exports.updateAccount = (id, data) => prisma.account.update({where: {id}, data});

exports.deleteAccount = (id) => prisma.account.delete({where: {id}});

exports.deleteAccountByUserId = (userId) => prisma.account.deleteMany({where: {userId}});