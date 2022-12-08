"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const userRoutes = express_1.default.Router();
const controller = new users_controller_1.default();
// userRoutes.get('/fetch', controller.getAllPosts);
// userRoutes.post('/create', controller.createAPost);
userRoutes.get('/test-get', controller.getTest);
userRoutes.get('/test-halo', controller.testHalo);
exports.default = userRoutes;
