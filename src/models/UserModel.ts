import Sequelize from "sequelize";
import db from "../db";
import Role from "./RoleModel";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
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
  // role_id: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true,
  //   }
  // },
  vehicle_no: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  reservation_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
}, {
  freezeTableName: true
})

Role.hasMany(Users);
Users.belongsTo(Role, { foreignKey: 'role_id' })

export default Users;