const Mongoose = require("mongoose");
const socialMediaModel = require("./socialMedia.model");
const {Users} = require("./user.model");
const Schema = Mongoose.Schema;

const socialSchema = new Schema({
    url: {
        type: String,
        trim: true
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    id_social_media: {
        type: Schema.Types.ObjectId,
        ref: socialMediaModel
    },
    visible: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = Mongoose.model("Social", socialSchema);