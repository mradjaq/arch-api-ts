import Sequelize, { Model, Optional } from "sequelize";
import db from "../db";
import Reservation from "./ReservationModel";
import Role from "./RoleModel";

const { DataTypes } = Sequelize;

const Users = db.define<UserInstance>('users', {
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
  reservation_id: {
    type: DataTypes.STRING,
    allowNull: true,
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
})

Reservation.hasOne(Users);
Users.belongsTo(Reservation, { foreignKey: 'reservationUuid' });
Role.hasMany(Users);
Users.belongsTo(Role, { foreignKey: 'roleUuid' });


export default Users;
interface IUser {
  uuid?: string;
  username: string;
  email: string;
  password: string;
  vehicle_no: string;
  reservation_id?: string;
  token?: string;
  role_uuid?: string;
}

/*
  We have to declare the UserCreationAttributes to
  tell Sequelize and TypeScript that the property uuid,
  in this case, is optional to be passed at creation time
*/
// interface UserCreationAttributes
//   extends Optional<IUser, 'uuid'> {}

interface UserInstance
  extends Model<IUser>,
    IUser {
      createdAt?: Date;
      updatedAt?: Date;
    }