"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const auth_user_middleware_1 = require("../middleware/auth-user.middleware");
const userRoutes = express_1.default.Router();
const controller = new users_controller_1.default();
userRoutes.get('/users', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isUserManagement, controller.getAllUser);
userRoutes.get('/users/:uuid', auth_user_middleware_1.verifyUser, controller.getUserByUUID);
userRoutes.post('/users', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isUserManagement, controller.createUser);
userRoutes.post('/register', controller.registerUser);
userRoutes.patch('/users/:uuid', auth_user_middleware_1.verifyUser, controller.updateUser);
userRoutes.delete('/users/:uuid', auth_user_middleware_1.verifyUser, controller.deleteUser);
exports.default = userRoutes;
