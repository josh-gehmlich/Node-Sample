import { IUser, IUserRepository } from '../../types'

import makeUser from '../../domain/user'

export default function makeCreateUser ({ usersRepository }: { usersRepository: IUserRepository }) {
  return async function createUser (userInfo: Partial<IUser>) {
    const userEntity = await makeUser(userInfo)

    await usersRepository.insert({
      id: userEntity.getId(),
      email: userEntity.getEmail(),
      hash: userEntity.getPasswordHash()
    })

    return { id: userEntity.getId(), email: userEntity.getEmail() }
  }
}
