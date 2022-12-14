"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const authRoutes = express_1.default.Router();
const controller = new auth_1.default();
authRoutes.get('/me', controller.Me);
authRoutes.post('/login', controller.login);
authRoutes.delete('/logout', controller.logout);
exports.default = authRoutes;
