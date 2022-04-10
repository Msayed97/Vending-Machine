
import {env} from '../utils/constants'
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host : env.HOST,
      port : env.DB_PORT,
      database: env.DB_NAME,
      user:    env.DB_USER,
      password: env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      host : env.HOST,
      port : env.DB_PORT,
      database: env.DB_NAME,
      user:    env.DB_USER,
      password: env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
