import express from 'express'
import cors from 'cors'

import { makeExpressCallback, notFound } from './controllers'
import { signupUser, signinUser } from './controllers/users'

const app = express()

app.use(cors({
  origin: 'https://postwoman.io' // postwoman is used for testing
}))
app.use(express.json())

app.post('/api/v1/users/signup', makeExpressCallback(signupUser))
app.post('/api/v1/users/signin', makeExpressCallback(signinUser))

app.use(makeExpressCallback(notFound))

export default app
