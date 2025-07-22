const prisma = require("../prismaClient/prismaClient");

exports.createTransaction = (data) => prisma.transaction.create({data});

exports.updateStatus =  (id, status) =>
    prisma.transaction.update({
        where: {id},
        data: {status},
    });

exports.getById = (id) =>
    prisma.transaction.findUnique({where: {id}});    