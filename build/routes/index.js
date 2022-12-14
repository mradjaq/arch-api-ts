"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const parking_spot_1 = __importDefault(require("./parking-spot"));
const role_1 = __importDefault(require("./role"));
const reservation_1 = __importDefault(require("./reservation"));
class AppRoutes {
    constructor() {
        this.routers = [
            users_1.default,
            parking_spot_1.default,
            role_1.default,
            reservation_1.default
        ];
    }
}
exports.default = AppRoutes;
