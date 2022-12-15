"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_user_middleware_1 = require("../middleware/auth-user.middleware");
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
const roleRoutes = express_1.default.Router();
const controller = new role_controller_1.default();
roleRoutes.get('/role', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isUserManagement, controller.getAllRole);
roleRoutes.post('/role', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isUserManagement, controller.createRole);
roleRoutes.patch('/role/:uuid', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isUserManagement, controller.updateRole);
exports.default = roleRoutes;
