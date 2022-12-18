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
const WalletModel_1 = __importDefault(require("../models/WalletModel"));
// import UserModel from '../models/user';
class WalletController {
    constructor() {
        this.topupWalletBalance = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                let topup_balance = request.body.balance;
                if (topup_balance < 10000)
                    response.status(400).json({ msg: "Saldo topup kurang dari minimal yang ditentukan" });
                const user = yield UserModel_1.default.findOne({
                    where: {
                        uuid: request.session.user_id
                    }
                });
                const wallet = yield WalletModel_1.default.findOne({
                    where: {
                        uuid: user === null || user === void 0 ? void 0 : user.walletUuid
                    }
                });
                topup_balance += wallet === null || wallet === void 0 ? void 0 : wallet.balance;
                yield WalletModel_1.default.update({
                    balance: topup_balance
                }, {
                    where: {
                        uuid: wallet === null || wallet === void 0 ? void 0 : wallet.uuid
                    }
                });
                response.status(201).json({ msg: "Berhasil menambah saldo dompet" });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        WalletModel_1.default.sync();
    }
}
exports.default = WalletController;
