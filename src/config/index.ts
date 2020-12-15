import dotenv from 'dotenv';

const env = dotenv.config();

if (env.error) {
  throw new Error('.env file is missing');
}

export default {
  env: process.env.NODE_ENV || 'production',
  mongoDBDomain: process.env.MONGODB_DOMAIN,
  serverPort: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
};
