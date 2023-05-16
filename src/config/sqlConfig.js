//COnfiguration for My SQL database Version

const configSql = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "28158598",
    database: "coderhouse",
  },
  pool: { min: 0, max: 7 },
};

export default configSql;
