import sql from "mssql";

const dbConnect = async () => {
  try {
    const sqlConfig = {
      authentication: {
        options: {
          userName: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
        },
        type: "default",
      },
      database: process.env.DATABASE_NAME,
      server: process.env.DATABASE_SERVER,
      options: {
        encrypt: process.env.NODE_ENV == "production" ? true : false,
        trustServerCertificate:
          process.env.NODE_ENV == "production" ? false : true,
      },
    };

    const connected = await sql.connect(sqlConfig);
    if (connected) {
      console.log("database is connected");
    }
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
