import Sequelize, { Model, Optional } from "sequelize";
import db from "../db";
import Reservation from "./ReservationModel";
import Role from "./RoleModel";

const { DataTypes } = Sequelize;

const Wallet = db.define<WalletInstance>('wallet', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: true
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
}, {
  freezeTableName: true
});

export default Wallet;

interface IWallet {
  uuid?: string;
  balance: number;
}

interface WalletInstance extends Model<IWallet>, IWallet {
  createdAt?: Date;
  updatedAt?: Date;
}

