import { IResponse } from '../../../../types'
import { InvalidInputError } from '../../../../utils/errors'

export default function makeSigninUser ({ validateUser }: any) {
  return async function signupUser (httpRequest: IResponse) {
    try {
      const user = await validateUser({
        ...httpRequest.body
      })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 200,
        body: { user }
      }
    } catch (thrown) {
      let status = 500
      let error = {
        error: 'Internal Server Error',
        message: 'An unknown error has occurred'
      }

      if (thrown instanceof InvalidInputError) {
        status = 400
        error = {
          error: 'Bad Request',
          message: thrown.message
        }
      }

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: status,
        body: error
      }
    }
  }
}
