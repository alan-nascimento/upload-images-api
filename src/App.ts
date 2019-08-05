import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

class App {
    public express: express.Application;

    public constructor () {
        this.express = express()

        this.database()
        this.routes()
        this.dotEnv()
    }

    private database (): void {
        mongoose.connect(
            'mongodb://localhost:27017/upload',
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
