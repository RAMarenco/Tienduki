const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");

const productImageSchema = new Schema({
    imageUrl: {
        type: String,
        trim: true,
        required: true
    },
    id_store: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    visible: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = Mongoose.model("productImage", productImageSchema);