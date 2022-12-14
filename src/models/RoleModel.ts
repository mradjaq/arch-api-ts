import Sequelize from "sequelize";
import db from "../db";
import Users from "./UserModel";

const { DataTypes } = Sequelize;

const Role = db.define('role', {
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
})

export default Role;