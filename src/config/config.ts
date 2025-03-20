import "dotenv/config";

export  const config = {
  port: process.env.PORT || 3000,
  appId: process.env.APP_ID,
  appSecret: process.env.APP_SECRET,
  // recipientWaId: process.env.RECIPIENT_WAID,
  version: process.env.VERSION,
  phoneNumberId: process.env.PHONE_NUMBER_ID,
  accessToken: process.env.ACCESS_TOKEN,
  //SQL Server
  server: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
};
