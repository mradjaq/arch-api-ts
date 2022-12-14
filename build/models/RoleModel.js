"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const { DataTypes } = sequelize_1.default;
const Role = db_1.default.define('role', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
});
exports.default = Role;
