import Sequelize, { Model, Optional } from "sequelize";
import db from "../db";
import Users from "./UserModel";
import Reservation from "./ReservationModel";
import Role from "./RoleModel";

const { DataTypes } = Sequelize;

const Payment = db.define<PaymentInstance>('payment', {
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

Reservation.hasOne(Payment);
Payment.belongsTo(Reservation, { foreignKey: 'reservationUuid' });


export default Payment;

interface IPayment {
  uuid?: string;
  amount_due?: number;
  paid?: boolean;
  reservationUuid?: string;
}

interface PaymentInstance extends Model<IPayment>, IPayment {
  createdAt?: Date;
  updatedAt?: Date;
}

