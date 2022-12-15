"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const ReservationModel_1 = __importDefault(require("./ReservationModel"));
const { DataTypes } = sequelize_1.default;
const ParkingSpot = db_1.default.define('parkingspot', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    floor: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    spot_no: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});
ReservationModel_1.default.hasOne(ParkingSpot);
ParkingSpot.belongsTo(ReservationModel_1.default, { foreignKey: {
        name: 'reservationUuid',
        field: 'reservationUuid',
        allowNull: true
    }, foreignKeyConstraint: true });
exports.default = ParkingSpot;
