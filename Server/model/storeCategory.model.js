const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");

const storeCategorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    stores: [{
        type: Schema.Types.ObjectId,
        ref: Users
    }],
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("storeCat", storeCategorySchema);