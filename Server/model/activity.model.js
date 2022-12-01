const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const activitySchema = new Schema({
    id_element: {
        type: Schema.Types.ObjectId,
        trim: true,
        required:true
    },
    type_activity: {
        type: String
    },
    visible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = Mongoose.model("activity", activitySchema);