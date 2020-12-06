import mongodb from 'mongodb'

export type makeMongoDb = () => Promise<mongodb.Db>

export interface IUser {
  id: string
  email: string
  hash: string
  [key: string]: any
}

export interface IUserRepository {
  findById: Function
  findByEmail: Function
  insert: Function
  remove: Function
  update: Function
}

interface anyObject { [key: string]: any }

export interface IResponse { headers: anyObject, statusCode: number, body: anyObject, [key: string]: any }

export interface IRequest {
  body: anyObject
  query: any
  params: any
  ip: string
  method: string
  path: string
  headers: anyObject
}
