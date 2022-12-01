const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const imageTypeSchema = new Schema({
    category: {
        type: String, 
        trim: true,
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = Mongoose.model("ImageType", imageTypeSchema);