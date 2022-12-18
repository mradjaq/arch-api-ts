"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_user_middleware_1 = require("../middleware/auth-user.middleware");
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const paymentRoutes = express_1.default.Router();
const controller = new payment_controller_1.default();
paymentRoutes.post('/payment/:reservation_uuid', auth_user_middleware_1.verifyUser, controller.payReservation);
// paymentRoutes.delete('/reservation/:reservation_uuid', verifyUser, controller.cancelReservation);
// paymentRoutes.get('/reservation-test', controller.testFee);
exports.default = paymentRoutes;
