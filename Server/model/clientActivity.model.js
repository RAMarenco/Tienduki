const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const {Users} = require("./user.model");
const activityModel = require("./activity.model");

const clientActivitySchema = new Schema({
    id_activity: {
        type: Schema.Types.ObjectId,
        ref: activityModel
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    visible: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = Mongoose.model("clientActivity", clientActivitySchema);