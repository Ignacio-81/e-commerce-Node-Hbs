import config from "./config.js";
/* 
MySQL Database COnfiguration
*/
const configSql = {
  client: "mysql",
  connection: {
    host: config.sql_host,
    user: config.sql_username,
    password: config.sql_password,
    database: config.sql_Db,
  },
  pool: { min: 0, max: 7 },
};

export default configSql;
