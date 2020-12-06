import { usersRepository } from '../../infra/database'
import { verifyPassword } from '../../utils/hash'

import makeCreateUser from './create'
import makeValidateUser from './validate'

const createUser = makeCreateUser({ usersRepository })
const validateUser = makeValidateUser({ usersRepository, verifyPassword })

const userService = {
  createUser,
  validateUser
}

export default userService
export { createUser, validateUser }
