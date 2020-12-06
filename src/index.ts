import config from './app/config'
import server from './interfaces/http/server'
import logger from './infra/logger'

server.listen(config.server.port, () => {
  logger.log('Server is listening PORT:', config.server.port)
})
