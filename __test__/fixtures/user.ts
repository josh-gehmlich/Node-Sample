import { internet } from 'faker'
import cuid, { isCuid } from 'cuid'

const Id = {
  makeId: cuid,
  isValidId: isCuid
}

function createFakeUser (overrides: any): any {
  const user = {
    id: Id.makeId(),
    email: internet.email(),
    password: internet.password(10)
  }

  return {
    ...user,
    ...overrides
  }
}

export default createFakeUser
