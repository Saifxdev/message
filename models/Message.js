const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Message = sequelize.define("Message", {
  content: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Message, { as: "SentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "ReceivedMessages", foreignKey: "receiverId" });

Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
Message.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

module.exports = Message;