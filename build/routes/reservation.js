"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_user_middleware_1 = require("../middleware/auth-user.middleware");
const reservation_controller_1 = __importDefault(require("../controllers/reservation.controller"));
const reservationRoutes = express_1.default.Router();
const controller = new reservation_controller_1.default();
reservationRoutes.post('/reservation/:parking_spot_id', auth_user_middleware_1.verifyUser, controller.createReservation);
reservationRoutes.delete('/reservation/:reservation_uuid', auth_user_middleware_1.verifyUser, controller.cancelReservation);
// reservationRoutes.get('/reservation-test', controller.testFee);
exports.default = reservationRoutes;
