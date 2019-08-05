import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import * as dotenv from 'dotenv'

class App {
    public express: express.Application;

    public constructor () {
        this.express = express()

        this.middlewares()
        this.database()
        this.routes()
        this.dotEnv()
    }

    private middlewares (): void {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
        this.express.use(morgan('dev'))
        this.express.use(cors())
        this.express.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
        )
    }

    private database (): void {
        mongoose.connect(
            process.env.DATABASE_URL,
            { useNewUrlParser: true }
        )
    }

    private routes (): void {
        this.express.use(routes)
    }

    private dotEnv (): void {
        dotenv.config()
    }
}

export default new App().express
