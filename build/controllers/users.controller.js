"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
const argon2_1 = __importDefault(require("argon2"));
const WalletModel_1 = __importDefault(require("../models/WalletModel"));
// import UserModel from '../models/user';
class UserController {
    constructor() {
        // Object of User model
        this.role = {
            user: '7bb3d328-ed9c-4d61-8a15-da2fe0427e52',
            user_management: 'a2fc93d9-93c1-4fac-ba1c-780d29d22520',
            parking_management: '35f88308-b04d-4b95-bdf4-815f23992a64'
        };
        this.testHalo = (request, response) => {
            response.send('GALLOOO');
        };
        this.getAllUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield UserModel_1.default.findAll({
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt']
                });
                response.status(200).json(res);
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.getUserByUUID = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield UserModel_1.default.findOne({
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservationUuid', 'token', 'createdAt', 'updatedAt'],
                    where: {
                        uuid: request.params.uuid
                    }
                });
                response.status(200).json(res);
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.createUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confPassword, vehicle_no, roleUuid } = request.body;
            if (password !== confPassword)
                return response.status(400).json({
                    msg: 'Password dan Password konfirmasi tidak sama'
                });
            const hashPassword = yield argon2_1.default.hash(password);
            try {
                const wallet_uuid = yield this.createUserWallet();
                yield UserModel_1.default.create({
                    username: name,
                    email,
                    password: hashPassword,
                    vehicle_no,
                    roleUuid: roleUuid,
                    walletUuid: wallet_uuid
                });
                response.status(201).json({ msg: "Berhasil membuat user" });
            }
            catch (error) {
                response.status(400).json({ msg: error.message });
            }
        });
        this.registerUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confPassword, vehicle_no, roleUuid } = request.body;
            if (password !== confPassword)
                return response.status(400).json({
                    msg: 'Password dan Password konfirmasi tidak sama'
                });
            const hashPassword = yield argon2_1.default.hash(password);
            try {
                const wallet_uuid = yield this.createUserWallet();
                console.log('wallet_uuid', wallet_uuid);
                yield UserModel_1.default.create({
                    username: name,
                    email,
                    password: hashPassword,
                    vehicle_no,
                    roleUuid: this.role.user,
                    walletUuid: wallet_uuid
                });
                response.status(201).json({ msg: "Berhasil Melakukan pendaftaran" });
            }
            catch (error) {
                response.status(400).json({ msg: error.message });
            }
        });
        this.updateUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt'],
                    where: {
                        uuid: request.params.uuid
                    }
                });
                if (!user)
                    return response.status(404).json({ msg: "User tidak dapat ditemukan" });
                const { name, email, password, confPassword, vehicle_no } = request.body;
                let hashPassword = '';
                if (password == '' || password === null) {
                    hashPassword = user.password;
                }
                else {
                    hashPassword = yield argon2_1.default.hash(password);
                }
                if (password !== confPassword)
                    return response.status(400).json({
                        msg: 'Password dan Password konfirmasi tidak sama'
                    });
                yield UserModel_1.default.update({
                    username: name,
                    email,
                    password: hashPassword,
                    vehicle_no
                }, {
                    where: {
                        uuid: user.uuid
                    }
                });
                response.status(201).json({ msg: "Data User berhasil diupdate" });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.deleteUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt'],
                    where: {
                        uuid: request.params.uuid
                    }
                });
                if (!user)
                    return response.status(404).json({ msg: "User tidak dapat ditemukan" });
                yield UserModel_1.default.destroy({
                    where: {
                        uuid: user.uuid
                    }
                });
                response.status(201).json({ msg: "Data User berhasil dihapus" });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        UserModel_1.default.sync();
    }
    createUserWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = yield WalletModel_1.default.create({
                    balance: 0
                });
                return wallet.uuid;
            }
            catch (error) {
                throw error;
                // response.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = UserController;
