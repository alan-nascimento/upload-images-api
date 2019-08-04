import { Router } from 'express'
import multer from 'multer'
import Multer from './config/Multer'

const routes = Router()

routes.post(
    '/uploads',
    multer(Multer).single('file'),
    (req, res): Promise<Response> => {
        console.log(req.file)
        return res.json({ hello: 'World!' })
    }
)

export default routes
