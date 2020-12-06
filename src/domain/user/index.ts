import Id from '../../utils/id'
import buildMakeUser from './user'
import { generatePasswordHash } from '../../utils/hash'

const makeUser = buildMakeUser({ Id, generatePasswordHash })

export default makeUser
