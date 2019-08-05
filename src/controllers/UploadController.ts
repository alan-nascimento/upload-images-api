import { Request, Response } from 'express'
import Post from '../models/Post'

class UploadController {
    public async create (req: Request, res: Response): Promise<Response> {
        const { originalname: name, size, key, location: url = '' } = req.file
        const post = await Post.create({ name, size, key, url })
        return res.json(post)
    }

    public async show (req: Request, res: Response): Promise<Response> {
        const post = await Post.find()
        return res.json(post)
    }

    public async delete (req: Request, res: Response): Promise<Response> {
        const post = await Post.findById(req.params.id)
        await post.remove()
        return res.send('Deleted')
    }
}

export default new UploadController()
