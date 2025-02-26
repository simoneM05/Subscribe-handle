"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.deleteUsers = deleteUsers;
exports.getUserWithProfile = getUserWithProfile;
const prisma_1 = require("../config/prisma");
async function createUser(email, password) {
    return await prisma_1.prisma.user.create({
        data: { email, password },
    });
}
async function getUsers(skip, take) {
    return await prisma_1.prisma.user.findMany({ skip, take });
}
async function getUser(id) {
    return await prisma_1.prisma.user.findMany({
        where: { id },
    });
}
async function updateUser(id, update) {
    const filtredUpdate = Object.fromEntries(Object.entries(update).filter(([_, v]) => v !== undefined));
    if (Object.keys(filtredUpdate).length === 0) {
        throw new Error("Nessum campo valido da aggiornare");
    }
    return await prisma_1.prisma.user.update({
        where: { id },
        data: filtredUpdate,
    });
}
async function deleteUser(id) {
    return await prisma_1.prisma.user.delete({
        where: { id },
    });
}
async function deleteUsers() {
    return await prisma_1.prisma.user.deleteMany();
}
async function getUserWithProfile(id) {
    return await prisma_1.prisma.user.findUnique({
        where: { id },
        include: { profile: true },
    });
}
