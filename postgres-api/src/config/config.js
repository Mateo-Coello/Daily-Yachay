require('dotenv').config();

const config = {

  // AMAZON DBSQL
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,

  // GOOGLE OAUTH
  googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleOauthRedirect: process.env.GOOGLE_OAUTH_REDIRECT_UR,

  // Jsonwebtoken
  wtSecretKey: process.env.JWT_SECRET_KEY,

}

// S3 AMAZON 
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});


module.exports = { config, AWS };