import { Request, Response } from 'express'
import Post from '../models/PostSchema'

class UploadController {
    public async create (req: Request, res: Response): Promise<Response> {
        const { originalname: name, size, key, location: url = '' } = req.file
        const post = await Post.create({ name, size, key, url })
        return res.json(post)
    }
}

export default new UploadController()
