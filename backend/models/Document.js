const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Document = sequelize.define("Document", {
    content: { type: DataTypes.TEXT, allowNull: false },
    version: { type: DataTypes.INTEGER, defaultValue: 1 },
});

module.exports = Document;
