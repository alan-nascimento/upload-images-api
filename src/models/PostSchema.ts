import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String
}, {
    timestamps: true
})

export default model('Post', PostSchema)
