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
const ReservationModel_1 = __importDefault(require("../models/ReservationModel"));
const ParkingSpotModel_1 = __importDefault(require("../models/ParkingSpotModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const node_cron_1 = __importDefault(require("node-cron"));
class ReservationController {
    constructor() {
        this.createReservation = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const parking_spot_id = request.params.parking_spot_id;
            try {
                const parking_spot = yield ParkingSpotModel_1.default.findOne({
                    where: {
                        uuid: parking_spot_id
                    }
                });
                if (!parking_spot)
                    return response.status(404).json({ msg: "Tempat parkir tidak dapat ditemukan" });
                if (parking_spot.reservationUuid)
                    return response.status(404).json({ msg: "Tempat parkir berada dalam pemesanan orang lain" });
                const reservation = yield ReservationModel_1.default.create({
                    parking_spot_id,
                    fee: 2000
                });
                if (!reservation)
                    return response.status(404).json({ msg: "Gagal melakukan pemesanan tempat parkir" });
                yield ParkingSpotModel_1.default.update({
                    floor: parking_spot.floor,
                    spot_no: parking_spot.spot_no,
                    status: 'booked',
                    reservationUuid: reservation.uuid
                }, {
                    where: {
                        uuid: parking_spot.uuid
                    }
                });
                /** Radja: Update col reservationUuid on user table */
                yield UserModel_1.default.update({
                    reservationUuid: reservation.uuid
                }, {
                    where: {
                        uuid: request.session.user_id
                    }
                });
                const reservation_response = {
                    reservation,
                    parking_spot
                };
                this.countTotalFee(reservation, parking_spot_id);
                response.status(200).json(reservation_response);
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.cancelReservation = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const reservation_uuid = request.params.reservation_uuid;
            try {
                const reservation = yield ReservationModel_1.default.findOne({
                    where: {
                        uuid: reservation_uuid
                    }
                });
                if (!reservation)
                    return response.status(404).json({ msg: "Pemesanan tidak dapat ditemukan" });
                const parking_spot = yield ParkingSpotModel_1.default.findOne({
                    where: {
                        uuid: reservation === null || reservation === void 0 ? void 0 : reservation.parking_spot_id
                    }
                });
                if (!parking_spot)
                    return response.status(404).json({ msg: "Tempat parkir tidak dapat ditemukan" });
                yield ReservationModel_1.default.destroy({
                    where: {
                        uuid: reservation.uuid
                    }
                });
                yield ParkingSpotModel_1.default.update({
                    floor: parking_spot.floor,
                    spot_no: parking_spot.spot_no,
                    status: 'available'
                }, {
                    where: {
                        uuid: parking_spot.uuid
                    }
                });
                response.status(201).json({ msg: "Berhasil membatalkan pemesanan" });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.countTotalFee = (reservation, parking_spot_id) => {
            node_cron_1.default.schedule('* * * * * *', () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const created_date = ((_a = reservation === null || reservation === void 0 ? void 0 : reservation.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) || Date.now();
                const now = Date.now();
                var diff = now - created_date;
                var diffInHours = diff / 1000 / 60 / 60; // Convert milliseconds to hours
                let updated_fee = diffInHours >= 1 ? reservation.fee * (diffInHours + 1) : reservation.fee;
                try {
                    yield ReservationModel_1.default.update({
                        fee: updated_fee,
                        parking_spot_id
                    }, {
                        where: {
                            uuid: reservation.uuid
                        }
                    });
                    return { msg: "Berhasil melakukan update biaya" };
                }
                catch (error) {
                    throw error;
                }
            }));
        };
        ReservationModel_1.default.sync();
    }
}
exports.default = ReservationController;
