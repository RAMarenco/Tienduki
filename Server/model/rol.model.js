const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const rolSchema = new Schema({
    rol: {
        type: String,
        trim: true,
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("Rol", rolSchema);