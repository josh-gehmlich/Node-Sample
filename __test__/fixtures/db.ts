/* eslint-disable */

import { MongoClient as _MongoClient } from 'mongodb'
const MongoClient = _MongoClient

let connection: any, db: any

export default async function makeDb (): Promise<any> {
  connection =
    connection ||
    (await MongoClient.connect(
      (global as any).__MONGO_URI__,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ))
  db = db || (await connection.db((global as any).__MONGO_DB_NAME__))
  return db
}

export async function closeDb () {
  await connection.close()
  await db.close()
}

export async function clearDb () {
  await db.collection('users').deleteMany({})
  return true
}

export { connection, db }
