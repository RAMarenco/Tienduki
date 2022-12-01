const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");
const storeProductmodel = require("./storeProduct.model");

const cartSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    id_client: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    id_product: {
        type: Schema.Types.ObjectId,
        ref: storeProductmodel
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("cart", cartSchema);