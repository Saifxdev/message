const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

Role.hasMany(User);
User.belongsTo(Role);

module.exports = User;