import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'

class MulterConfig {
    private dest;

    public storage;

    private limits;

    private fileFilter;

    private s3;

    public constructor () {
        dotenv.config()

        this.dest = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

        this.storage = this.storageTypes().s3

        this.limits = {
            fileSize: 2 * 1024 * 1024
        }

        this.fileFilter = (req, file, cb): void => {
            const allowedMimes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ]

            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new Error('Invalid file type.'))
            }
        }
    }

    public storageTypes (): any {
        return { local: multer.diskStorage({
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
        }),
        s3: multerS3({
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
    }
}

export default new MulterConfig()
