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
const RoleModel_1 = __importDefault(require("../models/RoleModel"));
class Authenthication {
    constructor() {
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    attributes: ['uuid', 'username', 'password', 'email', 'vehicle_no', 'token', 'createdAt', 'updatedAt', 'roleUuid'],
                    where: {
                        email: request.body.email
                    }
                });
                if (!user)
                    return response.status(404).json({ msg: "User tidak ditemukan" });
                const match = yield argon2_1.default.verify(user.password, request.body.password);
                if (!match)
                    return response.status(400).json({ msg: "Password salah" });
                let user_role = yield RoleModel_1.default.findOne({
                    attributes: ['uuid', 'name'],
                    where: {
                        uuid: user.roleUuid
                    }
                });
                request.session.user_id = user.uuid;
                const uuid = user.uuid;
                const name = user.username;
                const email = user.email;
                const role = user_role === null || user_role === void 0 ? void 0 : user_role.name;
                response.status(200).json({ uuid, name, email, role });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.logout = (request, response) => __awaiter(this, void 0, void 0, function* () {
            request.session.destroy((err) => {
                if (err)
                    return response.status(400).json({ msg: "gagal logout" });
                response.status(200).json({ msg: "Berhasil logout" });
            });
        });
        this.Me = (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (!request.session.user_id) {
                return response.status(401).json({ msg: "Mohon login kembali ke akun anda : " });
            }
            const user = yield UserModel_1.default.findOne({
                attributes: ['uuid', 'username', 'email', 'roleUuid'],
                where: {
                    uuid: request.session.user_id
                }
            });
            if (!user)
                return response.status(404).json({ msg: "User tidak ditemukan" });
            let user_role = yield RoleModel_1.default.findOne({
                attributes: ['uuid', 'name'],
                where: {
                    uuid: user === null || user === void 0 ? void 0 : user.roleUuid
                }
            });
            const json_response = {
                uuid: user.uuid,
                name: user.username,
                email: user.email,
                role: user_role === null || user_role === void 0 ? void 0 : user_role.name
            };
            response.status(200).json(json_response);
        });
    }
}
exports.default = Authenthication;
