"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../db"));
const ReservationModel_1 = __importDefault(require("./ReservationModel"));
const RoleModel_1 = __importDefault(require("./RoleModel"));
const WalletModel_1 = __importDefault(require("./WalletModel"));
const { DataTypes } = sequelize_1.default;
const Users = db_1.default.define('users', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    vehicle_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});
ReservationModel_1.default.hasOne(Users);
Users.belongsTo(ReservationModel_1.default, { foreignKey: 'reservationUuid' });
RoleModel_1.default.hasMany(Users);
Users.belongsTo(RoleModel_1.default, { foreignKey: 'roleUuid' });
WalletModel_1.default.hasMany(Users);
Users.belongsTo(WalletModel_1.default, { foreignKey: 'walletUuid' });
exports.default = Users;
