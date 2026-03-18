const {Schema , model} = require("mongoose")

const fileSchema = new Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    filename: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    type: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    size: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const FileModel = model("File" , fileSchema)
module.exports = FileModel