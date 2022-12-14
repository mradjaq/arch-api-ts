"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySqlConnection = exports.mysql_connection = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv = __importStar(require("dotenv"));
// import { Sequelize } from "sequelize";
dotenv.config();
function mySqlConnection() {
    exports.mysql_connection = mysql_1.default.createConnection('mysql://foqmnvgjwkqr8ld9ap7x:pscale_pw_aIOcoWPGE9YCB5YR1pft1dNEF5oOMRhZWkgPUpurNpc@ap-southeast.connect.psdb.cloud/radjaparking?ssl={"rejectUnauthorized":true}');
    exports.mysql_connection.connect((err) => {
        if (err) {
            console.log('SQL error occured while connecting', err);
        }
        else {
            console.log('connection with mySql Successfully created');
            // var sql = "SELECT * FROM radjaparking.test;"
            // mysql_connection.query(sql, function (err, result) {
            //   if (err) throw err;
            //   console.log("1 record inserted", result);
            // });
        }
    });
    return exports.mysql_connection;
}
exports.mySqlConnection = mySqlConnection;
// console.log('mysql_connection', mysql_connection);
/**
 * PLanetScale
 * */
// database: radjaparking
// username: foqmnvgjwkqr8ld9ap7x
// host: ap-southeast.connect.psdb.cloud
// password: pscale_pw_aIOcoWPGE9YCB5YR1pft1dNEF5oOMRhZWkgPUpurNpc
