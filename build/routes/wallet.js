"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_user_middleware_1 = require("../middleware/auth-user.middleware");
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const walletRoutes = express_1.default.Router();
const controller = new wallet_controller_1.default();
walletRoutes.post('/wallet-topup', auth_user_middleware_1.verifyUser, controller.topupWalletBalance);
exports.default = walletRoutes;
