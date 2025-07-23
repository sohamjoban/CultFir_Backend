import { Sequelize } from "sequelize";
import { dbconfig } from "../../config";

const sequelize = new Sequelize({
   dialect: "mysql",
   host: dbconfig.DB_HOST,
   username: dbconfig.DB_USER,
   password: dbconfig.DB_PASSWORD,
   database: dbconfig.DB_NAME
});

export default sequelize;