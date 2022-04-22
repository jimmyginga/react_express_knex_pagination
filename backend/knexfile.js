import Knex from 'knex'
import {config} from 'dotenv'
import pg from "pg"
config()

pg.defaults.ssl = true;

const knexConfig= {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOSTNAME || '127.0.0.1',
      database: process.env.DB || 'pokedata',
      user: process.env.DB_USER || 'jimmyginga',
      password: process.env.DB_PASSWORD || 'root',
      port: process.env.DB_PORT || '5432',
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
  },
  //uncomment for production
  /*production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOSTNAME,
      database: process.env.DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false }, // install ssl lib and delete line
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
  },*/

};

export default Knex(knexConfig.development)