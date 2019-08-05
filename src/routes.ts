import { Router } from 'express'
import multer from 'multer'
import MulterConfig from './config/MulterConfig'
import Post from './models/PostSchema'

const routes = Router()

routes.post(
    '/upload',
    multer(MulterConfig).single('file'),
    async (req, res): any => {
        console.log(req.file)

        const { originalname: name, size, filename: key } = req.file

        const post = await Post.create({ name, size, key, url: '' })

        return res.json(post)
    }
)

export default routes
