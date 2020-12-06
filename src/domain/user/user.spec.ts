/* eslint-disable @typescript-eslint/no-floating-promises */
import createFakeUser from '../../../__test__/fixtures/user'
import createUser from './'

describe('user', () => {
  it('must have an id', () => {
    const user = createFakeUser({ id: null })
    expect(createUser(user)).rejects.toThrowError('User must have a valid id.')
  })

  it('must have a valid id', () => {
    const user = createFakeUser({ id: 'not-a-cuid' })
    expect(createUser(user)).rejects.toThrowError('User must have a valid id.')
  })

  it('must have an email', async () => {
    const user = createFakeUser({ email: null })
    expect(createUser(user)).rejects.toThrowError(
      'User must have a valid email.'
    )
  })

  it('must have a password', async () => {
    const user = createFakeUser({ password: null })
    expect(createUser(user)).rejects.toThrowError(
      'User must have a valid password.'
    )
  })

  it('can have an id', () => {
    const user = createFakeUser({ id: 'invalid' })
    expect(createUser(user)).rejects.toThrowError('User must have a valid id.')
    const noId = createFakeUser({ id: undefined })
    expect(createUser(noId)).resolves.toBeDefined()
  })

  it('can create an id', async () => {
    const noId = createFakeUser({ id: undefined })
    const user = await createUser(noId)
    expect(user.getId()).toBeDefined()
  })

  it('can create a hash', async () => {
    const user = createFakeUser({})
    const created = await createUser(user)
    expect(created.getPasswordHash()).toBeDefined()
  })
})
