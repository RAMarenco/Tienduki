const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");
const productCollectionModel = require("./productCollection.model");
const productImageModel = require("./productImage.model");

const storeProduct = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Mongoose.Types.Decimal128,
        trim: true,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    },
    _id_product_collection: {
        type: Schema.Types.ObjectId,
        ref: productCollectionModel,
        required: true
    },
    _id_store: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    image_product: [{
        type: Schema.Types.ObjectId,
        ref: productImageModel
    }]
}, { timestamps: true });

module.exports = Mongoose.model("storeProduct", storeProduct, "storeproducts");