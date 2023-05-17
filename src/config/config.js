import dotenv from "dotenv";
/* 
Application Configuration Settings
*/
dotenv.config();

const config = {
  mode_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  mongoDb: process.env.MONGO_URL,
  session_time: parseInt(process.env.SESSION_EXPIRED),
  //Tipo persistencia MEM -MONGO - MySQL
  tipo_persistencia: process.env.TIPO_PERSISTENCIA || "MONGO",
  sql_host: process.env.SQ_HOST,
  sql_username: process.env.SQL_USERNAME,
  sql_password: process.env.SQL_PASS,
  sql_Db: process.env.SQL_DB,
};

export default config;
