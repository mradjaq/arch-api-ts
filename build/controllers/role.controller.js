"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleModel_1 = __importDefault(require("../models/RoleModel"));
class RoleController {
    constructor() {
        this.createRole = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { name } = request.body;
            try {
                yield RoleModel_1.default.create({
                    name: name,
                });
                response.status(201).json({ msg: "Berhasil membuat Role" });
            }
            catch (error) {
                response.status(400).json({ msg: error.message });
            }
        });
        this.getAllRole = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield RoleModel_1.default.findAll();
                response.status(200).json(roles);
            }
            catch (error) {
                response.status(500).json({ msg: error.message });
            }
        });
        this.updateRole = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const uuid = request.params.uuid;
            try {
                const role = yield RoleModel_1.default.findOne({
                    where: {
                        uuid
                    }
                });
                if (!role)
                    return response.status(404).json({ msg: "User tidak dapat ditemukan" });
                const { name } = request.body;
                yield RoleModel_1.default.update({ name }, {
                    where: { uuid }
                });
                response.status(201).json({ msg: "Berhasil Merubah nama Role" });
            }
            catch (error) {
                response.status(400).json({ msg: error.message });
            }
        });
        RoleModel_1.default.sync();
    }
}
exports.default = RoleController;
