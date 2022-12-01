const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const orderStateModel = require("./orderState.model");
const productStoreModel = require("./storeProduct.model");
const orderModel = require("./order.model");

const orderDetailSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    date_of_order: {
        type: Date,
        required: true
    },
    total: {
        type: Mongoose.Types.Decimal128,
        required: true
    },
    id_state: {
        type: Schema.Types.ObjectId,
        ref: orderStateModel,
        required: true
    },
    id_product: {
        type: Schema.Types.ObjectId,
        ref: productStoreModel,
        required: true
    },
    id_order: {
        type: Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("orderDetail", orderDetailSchema);