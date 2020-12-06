import mongodb from 'mongodb'
import config from '../../app/config'

import makeUsersRepository from './repositories/usersRepository'

const MongoClient = mongodb.MongoClient

let credentials = ''

if (config.db.auth) {
  credentials = `${String(config.db.user)}:${encodeURIComponent(String(config.db.password))}@`
}

const url = `${String(config.db.prefix) ?? 'mongodb://'}${credentials}${String(config.db.host)}${config.db.port !== undefined ? `:${String(config.db.port)}` : ''}`
const options = config.prod ? { autoIndex: false } : {}

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, ...options })

export async function makeDb (): Promise<mongodb.Db> {
  if (!client.isConnected()) {
    await client.connect()
  }

  return client.db(String(config.db.database))
}

const usersRepository = makeUsersRepository({ makeDb })

export { usersRepository }
