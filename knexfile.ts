import type { Knex } from 'knex';
import { envVariables } from 'src/config';

const { database } = envVariables();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: database.name,
      user: database.username,
      password: database.password,
      host: database.host,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: database.name,
      user: database.username,
      password: database.password,
      host: database.host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: database.name,
      user: database.username,
      password: database.password,
      host: database.host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
