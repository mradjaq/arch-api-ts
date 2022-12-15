"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReservationModel_1 = __importDefault(require("../models/ReservationModel"));
class ReservationController {
    constructor() {
        ReservationModel_1.default.sync();
    }
}
exports.default = ReservationController;
