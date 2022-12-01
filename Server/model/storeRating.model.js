const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users, UsersExtras} = require("./user.model");

const storeRatingSchema = new Schema({
    rating: {
        type: Mongoose.Types.Decimal128,
        trim: true,
        required: true
    },
    client:{
        type: Schema.Types.ObjectId,
        ref: Users
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    visible: {
        type: Boolean,
        default: false
    }

    
}, { timestamps: true });

module.exports = Mongoose.model("storeRating", storeRatingSchema);