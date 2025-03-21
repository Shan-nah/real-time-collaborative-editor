const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed", error);
    }
};

module.exports = { sequelize, connectDB };
