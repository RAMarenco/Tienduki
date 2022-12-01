const Mongoose = require("mongoose");
const imageTypeModel = require("./imageType.model");
const {Users} = require("./user.model");
const Schema = Mongoose.Schema;

const imageSchema = new Schema({
    imageUrl: {
        type: String,
        trim: true,
        required:true
    },
    id_image_type: {
        type: Schema.Types.ObjectId,
        ref: imageTypeModel
    },    
    id_user: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("Image", imageSchema);