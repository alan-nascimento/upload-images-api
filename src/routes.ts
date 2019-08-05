import { Router } from 'express'
import multer from 'multer'
import MulterConfig from './config/MulterConfig'
import UploadController from './controllers/UploadController'

const routes = Router()

routes.get('/upload', UploadController.show)
routes.post('/upload', multer(MulterConfig).single('file'), UploadController.create)
routes.delete('/upload/:id', UploadController.delete)

export default routes
