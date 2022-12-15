"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const { DataTypes } = sequelize_1.default;
const Reservation = db_1.default.define('reservation', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
        // validate: {
        //   notEmpty: true
        // }
    },
    parking_spot_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    // user_uuid: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   }
    // }
}, {
    freezeTableName: true
});
exports.default = Reservation;
