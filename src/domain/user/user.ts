import { IUser } from '../../types'
import { InvalidInputError } from '../../utils/errors'

interface IdUtil {
  createId: (() => string) & {
    slug: () => string
    isCuid: (cuid: string) => boolean
    isSlug: (slug: string) => boolean
  }
  isValidId: (cuid: string) => boolean
}

type hashFunction = (password: string) => Promise<string>

export default function buildMakeUser ({ Id, generatePasswordHash }: { Id: IdUtil, generatePasswordHash: hashFunction }) {
  return async function makeUser ({ id = Id.createId(), email, password }: Partial<IUser>) {
    if (!Id.isValidId(id)) {
      throw new InvalidInputError('User must have a valid id.')
    } else if (email === undefined || typeof email !== 'string') {
      throw new InvalidInputError('User must have a valid email.')
    } else if (password === undefined || typeof password !== 'string') {
      throw new InvalidInputError('User must have a valid password.')
    }

    const hash = await generatePasswordHash(password)

    // TODO: Check if email is an actual email, check if hash is a PHC string

    return {
      getId: () => id,
      getEmail: () => email,
      getPasswordHash: () => hash
    }
  }
}
