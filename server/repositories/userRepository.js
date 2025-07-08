const prisma = require("../prismaClient/prismaClient");

exports.getAllUsers = () => prisma.user.findMany();

exports.getUserById = (id) => prisma.user.findUnique({where: {id}});

exports.findByEmail = (email) => prisma.user.findUnique({where: {email}});

exports.createUser = (data) => prisma.user.create({data});

exports.updateUser = (id, data) => prisma.user.update({where: {id}, data});

exports.deleteUser = (id) => prisma.user.delete({where: {id}});