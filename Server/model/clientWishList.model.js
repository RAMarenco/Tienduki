const Mongoose = require("mongoose");
const productStoreModel = require("./storeProduct.model");
const {Users} = require("./user.model");
const Schema = Mongoose.Schema;

const clientWishListSchema = new Schema({
    id_product: {
        type: Schema.Types.ObjectId,
        ref: productStoreModel
    },
    id_client: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("clientWishList", clientWishListSchema);