import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import UserRouter from './src/users.router'


const app = express()
const PORT = process.env.PORT
const MONGO_DB_URL: any = process.env.MONGO_DB_URL

mongoose.connect(MONGO_DB_URL)

app.use(express.json())
app.use(UserRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });