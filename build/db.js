"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB_Sequelize = new sequelize_1.Sequelize('u378097923_arch_parking', 'u378097923_architect_park', 'Parkingarchitect1', {
    host: 'first-architect.online',
    port: 3306,
    dialect: 'mysql'
});
exports.default = DB_Sequelize;
