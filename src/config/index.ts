import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (env.error) {
  throw new Error('.env file is missing');
}

const apolloServer = {
  path: '/graphql',
};
const expressServer = {
  domain: process.env.EXPRESS_SERVER_DOMAIN || 'localhost',
  protocol: process.env.EXPRESS_SERVER_PROTOCOL || 'http',
  port: process.env.EXPRESS_SERVER_PORT ? parseInt(process.env.EXPRESS_SERVER_PORT, 10) : 8000,
};
const expressServerUrl = `${expressServer.protocol}://${expressServer.domain}:${expressServer.port}`;

export default {
  apolloServer: {
    ...apolloServer,
    url: `${expressServerUrl}${apolloServer.path}`,
  },
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    type: process.env.NODE_ENV,
  },
  expressServer: {
    ...expressServer,
    allowedOrigins: process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(','),
    url: expressServerUrl,
  },
  mongoDB: {
    domain: process.env.MONGODB_DOMAIN,
  },
};
