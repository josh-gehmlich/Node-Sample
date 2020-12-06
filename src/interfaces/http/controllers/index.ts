import express from 'express'
import { IResponse, IRequest } from '../../../types'

export async function notFound (): Promise<IResponse> {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    body: { error: 'Not Found', message: 'The requested route could not be found' },
    statusCode: 404
  }
}

export function makeExpressCallback (controller: (httpRequest: any) => Promise<IResponse>) {
  return (req: express.Request, res: express.Response) => {
    const httpRequest: IRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent')
      }
    }

    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers !== undefined) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(() => res.status(500).send({ error: 'Internal Server Error', message: 'An unknown error occurred.' }))
  }
}
