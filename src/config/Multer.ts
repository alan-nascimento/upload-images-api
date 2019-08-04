import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

class Multer {
    private dest;

    private storage;

    private limits;

    private fileFilter;

    public constructor () {
        this.dest = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

        this.storage = multer.diskStorage({
            destination: (req, file, cb): void => {
                cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
            },
            filename: (req, file, cb): void => {
                crypto.randomBytes(16, (err, hash): void => {
                    if (err) {
                        cb(err, null)
                    }

                    const fileName = `${hash.toString('hex')}-${file.originalname}`

                    cb(null, fileName)
                })
            }
        })

        this.limits = {
            fileSize: 2 * 1024 * 1024
        }

        this.fileFilter = (req, file, cb): BlobCallback => {
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
}

export default new Multer()
