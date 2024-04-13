/*
 *===========================================================
 *  Register all the environment variables here
 * ==========================================================
 */

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  appEnv: process.env.APP_ENV || 'development',
  appSecret: process.env.APP_SECRET || generateSecret(),
  hashSecret: process.env.HASH_SECRET || generateSecret(4), // for hashing passwords

  database: {
    name: process.env.DATABASE_NAME, // required
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME, // required
    password: process.env.DATABASE_PASSWORD, // required
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },

  jwt: {
    secret: process.env.JWT_SECRET || generateSecret(), // for JWT token
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  isDevelopment: isDevelopment(),
  isProduction: isProduction(),
  isTesting: isTesting(),
  isStaging: isStaging(),
});

// additional helpers

const generateSecret = (part: number = 2): string => {
  let secret = '';
  for (let i = 0; i < part; i++) {
    secret += Math.random().toString(36).substring(2, 15);
  }
  return secret;
};

const isDevelopment = () =>
  ['development', 'dev'].includes(process.env.NODE_ENV as string);

const isProduction = () =>
  ['production', 'prod'].includes(process.env.NODE_ENV as string);

const isTesting = () =>
  ['test', 'testing'].includes(process.env.NODE_ENV as string);

const isStaging = () => ['staging'].includes(process.env.NODE_ENV as string);
