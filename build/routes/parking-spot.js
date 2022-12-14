"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parking_spot_controller_1 = __importDefault(require("../controllers/parking-spot.controller"));
const parkingSpotRoutes = express_1.default.Router();
const controller = new parking_spot_controller_1.default();
// userRoutes.get('/fetch', controller.getAllPosts);
// userRoutes.post('/create', controller.createAPost);
// userRoutes.post('/test-get', controller.getTest);
// userRoutes.get('/test-halo', controller.testHalo);
// userRoutes.get('/users', controller.getAllUser);
// userRoutes.get('/users/:uuid', controller.getUserByUUID);
// userRoutes.post('/users', controller.createUser);
// userRoutes.patch('/users/:uuid', controller.updateUser);
// userRoutes.delete('/users/:uuid', controller.deleteUser);
exports.default = parkingSpotRoutes;
