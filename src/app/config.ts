import { config } from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

config()

export default {
  prod: process.env.NODE_ENV === 'production',

  db: {
    prefix: process.env.MONGO_CONNECT_PREFIX,
    auth: process.env.MONGO_AUTH === 'true',
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB
  },

  server: {
    port: 3000
  }
}
