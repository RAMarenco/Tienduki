const Mongoose = require("mongoose");
const {Users} = require("./user.model");
const Schema = Mongoose.Schema;

const productCollection = new Schema({
    collectionName: {
        type: String,
        trim: true,
        required: true
    }, 
    _id_store: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    product_collections: [{
        type: Schema.Types.ObjectId,
        ref: "storeProduct"
    }]
}, { timestamps: true });

module.exports = Mongoose.model("productCollection", productCollection);