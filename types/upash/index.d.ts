declare module 'upash' {
    type PHCstring = string

    namespace Upash {
      /**
         * Installs a compatible password hashing function.
         */
      function install (
        name: string,
        algorithm: {
          hash: (
            password: string,
            options?: { [key: string]: any }
          ) => Promise<PHCstring>
          verify: (
            phcString: PHCstring,
            password: string
          ) => Promise<boolean>
        }
      ): void

      /**
         * Gets the list of the installed password hashing functions.
         */
      function list (): string[]

      /**
         * Uninstalls a password hashing function previously installed.
         */
      function uninstall (name: string): void

      /**
         * Selects manually which password hashing function to use. You can call hash and verify on the object returned.
         */
      function use (
        name: string
      ): {
        hash: typeof hash
        verify: typeof verify
      }

      /**
         * Returns the name of the algorithm that has generated the hash string.
         */
      function which (name: PHCstring): string

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
      function verify (
        phcString: PHCstring,
        password: string
      ): Promise<boolean>
    }

    export = Upash
}
