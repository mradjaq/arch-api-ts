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
exports.isUserManagement = exports.verifyUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const verifyUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.session.user_id) {
            return response.status(401).json({ msg: "Mohon login kembali ke akun anda : " });
        }
        const user = yield UserModel_1.default.findOne({
            attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
            where: {
                uuid: request.session.user_id
            }
        });
        if (!user)
            return response.status(404).json({ msg: "User tidak ditemukan" });
        request.session.user_id = user.uuid;
        // request.session.role = user.role
        next();
    }
    catch (error) {
        console.log('err auth-middleware', error);
        response.status(500).json({ msg: error.message });
        next(error);
    }
});
exports.verifyUser = verifyUser;
const isUserManagement = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({
            attributes: ['uuid', 'username', 'email', 'vehicle_no', 'reservation_id', 'token', 'createdAt', 'updatedAt'],
            where: {
                uuid: request.session.user_id
            }
        });
        if (!user)
            return response.status(404).json({ msg: "User tidak ditemukan" });
        /**
         * @todo harus join table biar dapet nama role
         */
        // if (user.role) return response.status(403).json({msg: "Access Denied"});
        // request.session.role = user.role
        next();
    }
    catch (error) {
        console.log('err auth-middleware', error);
        response.status(500).json({ msg: error.message });
        next(error);
    }
});
exports.isUserManagement = isUserManagement;
