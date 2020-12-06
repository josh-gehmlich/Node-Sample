declare module '@phc/argon2' {
  type PHCstring = string

  namespace Argon2 {
    /**
     * Gets the list of all identifiers supported by this hashing function.
     */
    function identifiers (): string[]

    /**
     * Computes the hash string of the given password in the PHC format using argon2 package.
     * @returns a hash with the PHC string format (see https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md)
     */
    function hash (
      password: string,
      options?: { [key: string]: any }
    ): Promise<PHCstring>

    /**
     * Determines whether or not the hash stored inside the PHC formatted string matches the hash generated for the password provided.
     */
    function verify (phcString: PHCstring, password: string): Promise<boolean>
  }

  export = Argon2
}
