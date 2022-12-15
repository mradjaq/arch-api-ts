import Sequelize from "sequelize";
import Model from "sequelize/types/model";
import db from "../db";
import Users from "./UserModel";

const { DataTypes } = Sequelize;

const Role = db.define<RoleInstance>('role', {
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


export interface IRole {
  uuid?: string;
  name?: string;
}
interface RoleInstance
  extends Model<IRole>,
    IRole {
      createdAt?: Date;
      updatedAt?: Date;
    }