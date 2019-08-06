import { Schema, model } from 'mongoose'
import { promisify } from 'util'
import aws from 'aws-sdk'
import path from 'path'
import fs from 'fs'

import MulterConfig from '../config/MulterConfig'
import StorageTypes from '../config/StorageTypes'

const s3 = new aws.S3()

const PostSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String
}, {
    timestamps: true
})

PostSchema.pre('save', function (): void {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

PostSchema.pre('remove', function (): any {
    if (MulterConfig.storage === StorageTypes.s3) {
        console.log('here')
        return s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: this.key
        }).promise()
    } else {
        console.log('deleted from local')
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
        )
    }
})

export default model('Post', PostSchema)
