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
const ReservationModel_1 = __importDefault(require("../models/ReservationModel"));
const PaymentModel_1 = __importDefault(require("../models/PaymentModel"));
const ParkingSpotModel_1 = __importDefault(require("../models/ParkingSpotModel"));
// import UserModel from '../models/user';
class PaymentController {
    constructor() {
        this.payReservation = (request, response) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const reservation_uuid = request.params.reservation_uuid;
            try {
                const reservation = yield ReservationModel_1.default.findOne({
                    where: {
                        uuid: reservation_uuid
                    }
                });
                if (!reservation)
                    return response.status(404).json({ msg: "Reservasi tidak dapat ditemukan" });
                // this.getUser(request?.session?.user_id);
                const user = yield UserModel_1.default.findOne({
                    where: {
                        uuid: (_a = request === null || request === void 0 ? void 0 : request.session) === null || _a === void 0 ? void 0 : _a.user_id
                    }
                });
                // const wallet = this.getWallet(user?.walletUuid);
                const wallet = yield WalletModel_1.default.findOne({
                    where: {
                        uuid: user === null || user === void 0 ? void 0 : user.walletUuid
                    }
                });
                if ((wallet === null || wallet === void 0 ? void 0 : wallet.balance) < reservation.fee)
                    return response.status(400).json({ msg: "Saldo Anda tidak mencukupi untuk melakukan pembayaran" });
                let currene_balance = (wallet === null || wallet === void 0 ? void 0 : wallet.balance) - reservation.fee;
                yield ParkingSpotModel_1.default.update({
                    status: 'available',
                    reservationUuid: null
                }, {
                    where: {
                        uuid: reservation.parking_spot_id
                    }
                });
                yield WalletModel_1.default.update({
                    balance: currene_balance
                }, {
                    where: {
                        uuid: user === null || user === void 0 ? void 0 : user.walletUuid
                    }
                });
                yield PaymentModel_1.default.create({
                    amount_due: reservation.fee,
                    paid: true,
                    reservationUuid: reservation_uuid
                });
                yield UserModel_1.default.update({
                    reservationUuid: null
                }, {
                    where: {
                        uuid: request.session.user_id
                    }
                });
                return response.status(200).json({ msg: "Pembayaran berhasil" });
            }
            catch (error) {
                throw response.status(500).json({ msg: error.message });
            }
        });
        PaymentModel_1.default.sync();
    }
    getUser(user_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    where: {
                        uuid: user_uuid
                    }
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWallet(wallet_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = yield WalletModel_1.default.findOne({
                    where: {
                        uuid: wallet_uuid
                    }
                });
                return wallet;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateParkingSpotStatus(parking_spot_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ParkingSpotModel_1.default.update({
                    status: 'available',
                    reservationUuid: ''
                }, {
                    where: {
                        uuid: parking_spot_id
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PaymentController;
