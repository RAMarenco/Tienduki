const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");
const storeCategoryModel = require("./storeCategory.model");

const storeCategorieSchema = new Schema({
    id_store: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    id_store_category: {
        type: Schema.Types.ObjectId,
        ref: storeCategoryModel 
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("storeCategorie", storeCategorieSchema);