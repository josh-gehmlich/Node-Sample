import * as upash from 'upash'
import argon from '@phc/argon2'
upash.install('argon2', argon)

export async function generatePasswordHash (password: string): Promise<string> {
  return await upash.use('argon2').hash(password)
}

export async function verifyPassword (password: string, hash: string): Promise<boolean> {
  return await upash.verify(hash, password)
}
