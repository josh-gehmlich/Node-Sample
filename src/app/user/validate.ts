import { IUserRepository } from '../../types'
import { InvalidInputError } from '../../utils/errors'

export default function makeValidateUser ({ usersRepository, verifyPassword }: { usersRepository: IUserRepository, verifyPassword: (pass: string, hash: string) => Promise<boolean> }) {
  return async function validateUser (userInfo: { email: string, password: string }) {
    const found = await usersRepository.findByEmail(userInfo)

    if (found === null) {
      throw new InvalidInputError('User with the email and password combination does not exist')
    }

    const validPassword = await verifyPassword(userInfo.password, found.hash)

    if (!validPassword) {
      throw new InvalidInputError('User with the email and password combination does not exist')
    }

    return { id: found.id, email: found.email }
  }
}
