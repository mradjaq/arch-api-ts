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
// import UserModel from '../models/user';
class UserController {
    // Object of User model
    constructor() {
        // getTest = (request: express.Request, response: express.Response) => {
        //   console.log('Requset', request.body)
        //     let query = 'SELECT * FROM radjaparking.test WHERE name='${request.body.name}';`
        //     mysql_connection.query(query, (err: any, result: any) => {
        //       if (err) console.log("ERR", err);        
        //       else response.send({
        //         data: result
        //       })
        //     })
        // }
        this.testHalo = (request, response) => {
            response.send('GALLOOO');
        };
        this.getAllUser = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield UserModel_1.default.findAll({
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt']
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
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
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
            const { name, email, password, confPassword, vehicle_no } = request.body;
            if (password !== confPassword)
                return response.status(400).json({
                    msg: 'Password dan Password konfirmasi tidak sama'
                });
            const hashPassword = yield argon2_1.default.hash(password);
            try {
                yield UserModel_1.default.create({
                    username: name,
                    email,
                    password: hashPassword,
                    vehicle_no
                });
                response.status(201).json({ msg: "Berhasil membuat user" });
            }
            catch (error) {
                response.status(400).json({ msg: error.message });
            }
        });
        this.updateUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
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
                    attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
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
        // UserModel.sync();
    }
}
exports.default = UserController;
