import { Router } from 'express'
import multer from 'multer'
import MulterConfig from './config/MulterConfig'
import UploadController from './controllers/UploadController'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const routes = Router()

const storageS3 = new aws.S3({
    accessKeyId: ''
})

routes.post('/upload', multer(MulterConfig).single('file'), UploadController.create)

export default routes
