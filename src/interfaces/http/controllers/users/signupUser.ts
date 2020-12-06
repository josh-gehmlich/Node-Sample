import { IResponse } from '../../../../types'
import { InvalidInputError } from '../../../../utils/errors'
import { MongoError } from 'mongodb'

export default function makeSignupUser ({ createUser }: any) {
  return async function signupUser (httpRequest: IResponse) {
    try {
      const created = await createUser({
        ...httpRequest.body
      })

      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 201,
        body: { created }
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
      } else if (thrown instanceof MongoError && thrown.code === 11000) {
        // Code 11000 = duplicate key error

        status = 400
        error = {
          error: 'Bad Request',
          message: 'This email is already associated with a user'
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
