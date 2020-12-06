import makeDb, { closeDb } from '../../../../__test__/fixtures/db'
import makeUsersDb from './usersRepository'
import createFakeUser from '../../../../__test__/fixtures/user'

describe('Users Repository', () => {
  let usersRepository: any

  beforeEach(() => {
    usersRepository = makeUsersDb({ makeDb })
  })

  it('inserts a user', async () => {
    const user = createFakeUser({})
    const result = await usersRepository.insert(user)
    return expect(result).toEqual(user)
  })

  afterAll(async () => {
    await closeDb()
  })
})
