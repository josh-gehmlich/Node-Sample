import { makeMongoDb, IUserRepository, IUser } from '../../../types'

import Id from '../../../utils/id'

const COLLECTION = 'users'

export default function makeCommentsDb ({ makeDb }: { makeDb: makeMongoDb }): IUserRepository {
  return {
    findById,
    findByEmail,
    insert,
    remove,
    update
  }

  async function findById ({ id: _id }: Partial<IUser>): Promise<IUser | null> {
    const db = await makeDb()

    const result = db.collection(COLLECTION).find({ _id })
    const found = await result.toArray()

    if (found.length === 0) {
      return null
    }

    const { _id: id, ...info } = found[0]

    return { id, ...info }
  }

  async function findByEmail ({ email }: { email: string }): Promise<IUser | null> {
    const db = await makeDb()

    const query = { email: email }
    const result = db.collection(COLLECTION).find(query)
    const found = await result.toArray()

    if (found.length === 0) {
      return null
    }

    const { _id: id, ...info } = found[0]

    return { id, ...info }
  }

  async function insert ({ id: _id = Id.createId(), ...userInfo }: IUser): Promise<IUser> {
    const db = await makeDb()

    const result = await db
      .collection('users')
      .insertOne({ _id, ...userInfo })

    const { _id: id, ...insertedInfo } = result.ops[0]

    return { id, ...insertedInfo }
  }

  async function update ({ id: _id, ...commentInfo }: IUser): Promise<IUser | null> {
    const db = await makeDb()

    const result = await db
      .collection(COLLECTION)
      .updateOne({ _id }, { $set: { ...commentInfo } })

    return result.modifiedCount > 0 ? { id: _id, ...commentInfo } : null
  }

  async function remove ({ id: _id }: Partial<IUser>): Promise<number> {
    const db = await makeDb()

    const result = await db.collection(COLLECTION).deleteOne({ _id })

    return result.deletedCount ?? 0
  }
}
