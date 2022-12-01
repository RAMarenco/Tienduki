const Mongoose = require("mongoose");
const {Users} = require("./user.model");
const Schema = Mongoose.Schema;


const tokenSchema = new Schema({
    token: {
        type: String
    },
    expiration_date: {
        type: Date,
        trim: true
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    expired: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



module.exports = Mongoose.model("Token", tokenSchema);