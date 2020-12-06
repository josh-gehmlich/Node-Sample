// TODO: Make this error allow an array of errors to return to the client
export class InvalidInputError extends Error {
  constructor (message: string) {
    super(message)

    this.name = 'InvalidInputError'

    // Allows the use of "error instanceof InvalidInputError"
    Object.setPrototypeOf(this, InvalidInputError.prototype)
  }
}
