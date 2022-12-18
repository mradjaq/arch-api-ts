"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const ReservationModel_1 = __importDefault(require("./ReservationModel"));
const { DataTypes } = sequelize_1.default;
const Payment = db_1.default.define('payment', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true
    },
    amount_due: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    paid: {
        type: DataTypes.BOOLEAN,
    }
}, {
    freezeTableName: true
});
ReservationModel_1.default.hasOne(Payment);
Payment.belongsTo(ReservationModel_1.default, { foreignKey: 'reservationUuid' });
exports.default = Payment;
