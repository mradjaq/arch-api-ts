"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_user_middleware_1 = require("../middleware/auth-user.middleware");
const parking_spot_controller_1 = __importDefault(require("../controllers/parking-spot.controller"));
const parkingSpotRoutes = express_1.default.Router();
const controller = new parking_spot_controller_1.default();
parkingSpotRoutes.get('/parking-spot', auth_user_middleware_1.verifyUser, controller.getAllParkingSpot);
parkingSpotRoutes.get('/parking-spot/:uuid', auth_user_middleware_1.verifyUser, controller.getSpotByUUID);
parkingSpotRoutes.post('/parking-spot', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isParkingManagement, controller.createNewParkingSpot);
parkingSpotRoutes.patch('/parking-spot/:uuid', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isParkingManagement, controller.updateParkingSpot);
parkingSpotRoutes.delete('/parking-spot/:uuid', auth_user_middleware_1.verifyUser, auth_user_middleware_1.isParkingManagement, controller.deleteParkingSpot);
exports.default = parkingSpotRoutes;
