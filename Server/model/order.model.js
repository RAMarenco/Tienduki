const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");

const orderSchema = new Schema({
    id_client: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    id_store: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    detail: [{
        type: Schema.Types.ObjectId,
        ref: "orderDetail"
    }],
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("order", orderSchema);