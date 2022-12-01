const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const orderStateSchema = new Schema({
    state: {
        type: String,
        required: true,
        trim: true
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("orderState", orderStateSchema);