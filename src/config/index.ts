import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (env.error) {
  throw new Error('.env file is missing');
}

const DEFAULT_HOST = 'localhost';
const DEFAULT_PROTOCOL = 'http';

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_PROTOCOL,
  DB_USERNAME,
  NODE_ENV,
  SERVER_ALLOWED_ORIGINS,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_PROTOCOL,
} = process.env;

const dbUrlScheme = {
  host: DB_HOST || DEFAULT_HOST,
  port: DB_PORT && parseInt(DB_PORT, 10),
  protocol: DB_PROTOCOL || DEFAULT_PROTOCOL,
};
const databaseUrl = `${dbUrlScheme.protocol}://${dbUrlScheme.host}${
  dbUrlScheme.port ? `:${dbUrlScheme.port}` : ''
}`;

const serverUrlScheme = {
  host: SERVER_HOST || DEFAULT_HOST,
  port: SERVER_PORT && parseInt(SERVER_PORT, 10),
  protocol: SERVER_PROTOCOL || DEFAULT_PROTOCOL,
};
const serverUrl = `${serverUrlScheme.protocol}://${serverUrlScheme.host}${
  serverUrlScheme.port ? `:${serverUrlScheme.port}` : ''
}`;

const graphqlUrlScheme = {
  path: '/graphql',
};
const graphqlUrl = `${serverUrl}${graphqlUrlScheme.path}`;

export default {
  database: {
    ...dbUrlScheme,
    name: DB_NAME,
    password: DB_PASSWORD || '',
    url: databaseUrl,
    username: DB_USERNAME || '',
  },
  env: {
    isDevelopment: NODE_ENV === 'development',
    isProduction: NODE_ENV === 'production',
    type: NODE_ENV,
  },
  graphql: {
    ...graphqlUrlScheme,
    url: graphqlUrl,
  },
  server: {
    ...serverUrlScheme,
    allowedOrigins: SERVER_ALLOWED_ORIGINS && SERVER_ALLOWED_ORIGINS.split(','),
    url: serverUrl,
  },
};
