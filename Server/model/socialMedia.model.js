const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const socialMediaSchema = new Schema({
    media: {
        type: String
    },
    visible: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = Mongoose.model("socialMedia", socialMediaSchema);