import { createUser, validateUser } from '../../../../app/user'

import makeSignupUser from './signupUser'
import makeSigninUser from './signinUser'

const signupUser = makeSignupUser({ createUser })
const signinUser = makeSigninUser({ validateUser })

export { signupUser, signinUser }
