"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const UserModel_1 = __importDefault(require("./UserModel"));
const { DataTypes } = sequelize_1.default;
const Reservation = db_1.default.define('reservation', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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
            notEmpty: true,
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
UserModel_1.default.hasOne(Reservation);
Reservation.belongsTo(UserModel_1.default, { foreignKey: 'user_uuid' });
exports.default = Reservation;
