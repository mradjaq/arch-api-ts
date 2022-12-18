import Sequelize, { Model, Optional } from "sequelize";
import db from "../db";
import Reservation from "./ReservationModel";
import Role from "./RoleModel";

const { DataTypes } = Sequelize;

interface IWallet {
  uuid?: string;
  balance?: number;
}

interface WalletInstance extends Model<IWallet>, IWallet {
  createdAt?: Date;
  updatedAt?: Date;
}

const Wallet = db.define<WalletInstance>('Wallet', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

export default Wallet;


