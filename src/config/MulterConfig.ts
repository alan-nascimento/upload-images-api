import path from 'path'
import StorageTypes from './StorageTypes'

class MulterConfig {
    private dest;

    public storage;

    private limits;

    private fileFilter;

    public constructor () {
        this.dest = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

        this.storage = StorageTypes.local

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
}

export default new MulterConfig()
