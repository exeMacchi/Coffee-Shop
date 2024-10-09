import { Sequelize } from "sequelize";
import { config } from "dotenv"

config();

const db = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
});

export default db;
