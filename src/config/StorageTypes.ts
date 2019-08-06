import path from 'path'
import multer from 'multer'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'

class StorageTypes {
    public local

    public s3: multer.StorageEngine

    public constructor () {
        this.dotEnv()
        this.local = multer.diskStorage({
            destination: (req, file, cb): void => {
                cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
            },
            filename: (req, file, cb): void => {
                crypto.randomBytes(16, (err, hash): void => {
                    if (err) cb(err, null)
                    file.key = `${hash.toString('hex')}-${file.originalname}`
                    cb(null, file.key)
                })
            }
        })
        this.s3 = multerS3({
            s3: new aws.S3(),
            bucket: process.env.BUCKET_NAME,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            key: (req, file, cb): void => {
                crypto.randomBytes(16, (err, hash): void => {
                    if (err) cb(err)
                    const fileName = `${hash.toString('hex')}-${file.originalname}`
                    cb(null, fileName)
                })
            }
        })
    }

    private dotEnv (): void {
        dotenv.config()
    }
}

export default new StorageTypes()
