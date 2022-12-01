const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
    nombre: {
        type: String,
        thim: true,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true,
        required:true
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("imagePrueba", imageSchema);