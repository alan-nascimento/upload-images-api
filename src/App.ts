import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'

class App {
    public express: express.Application;

    public constructor () {
        this.express = express()

        this.database()
        this.routes()
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
}

export default new App().express
