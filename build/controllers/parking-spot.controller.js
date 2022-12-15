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
const ParkingSpotModel_1 = __importDefault(require("../models/ParkingSpotModel"));
class ParkingSpotController {
    constructor() {
        this.getAllParkingSpot = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const parking_spots = yield ParkingSpotModel_1.default.findAll();
                response.status(200).json(parking_spots);
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.getSpotByUUID = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield ParkingSpotModel_1.default.findOne({
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
        this.createNewParkingSpot = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { floor, spot_no } = request.body;
            try {
                yield ParkingSpotModel_1.default.create({
                    floor,
                    spot_no,
                    status: 'available'
                });
                response.status(201).json({ msg: "Berhasil membuat tempat parkir baru" });
            }
            catch (error) {
                response.status(400).json({ msg: error.message });
            }
        });
        this.updateParkingSpot = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const parking_spot = yield ParkingSpotModel_1.default.findOne({
                    where: {
                        uuid: request.params.uuid
                    }
                });
                if (!parking_spot)
                    return response.status(404).json({ msg: "Tempat parkir tidak dapat ditemukan" });
                const { floor, spot_no, status, reservation_id } = request.body;
                yield ParkingSpotModel_1.default.update({
                    floor,
                    spot_no,
                    status,
                }, {
                    where: {
                        uuid: parking_spot.uuid
                    }
                });
                response.status(201).json({ msg: "Data tempat parkir berhasil diupdate" });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.deleteParkingSpot = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const parking_spot = yield ParkingSpotModel_1.default.findOne({
                    where: {
                        uuid: request.params.uuid
                    }
                });
                if (!parking_spot)
                    return response.status(404).json({ msg: "Tempat parkir tidak dapat ditemukan" });
                yield ParkingSpotModel_1.default.destroy({
                    where: {
                        uuid: parking_spot.uuid
                    }
                });
                response.status(201).json({ msg: "Tempat parkir berhasil dihapus" });
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        ParkingSpotModel_1.default.sync();
    }
}
exports.default = ParkingSpotController;
