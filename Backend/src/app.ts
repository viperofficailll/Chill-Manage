import express from 'express'
import { UserRouter } from './Routes/User.Routes'
export const app = express()

app.use(express.json());


app.use('/api/v1/user' ,UserRouter) 