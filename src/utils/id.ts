import cuid from 'cuid'

const Id = {
  createId: cuid,
  isValidId: cuid.isCuid
}

export default Id
