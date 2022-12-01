const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:auth-controller");
const crypto = require("crypto");

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    datebirth: {
        type: Date,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    hashedPassword: {
        type: String,
        required: false
    },
    salt: {
        type: String        
    },
    socials: [{
        type: Schema.Types.ObjectId,
        ref: "Social"
    }],
    image_user: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
    store_rating: [{
        type: Schema.Types.ObjectId,
        ref: "storeRating"
    }],
    id_rol: {
        type: Schema.Types.ObjectId,
        ref: "Rol"
    },
    visible: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.methods = {
    encryptPassword: function(password){
        if (!password) return ""; 

        try {
            const encryptedPassword = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64,
                `sha512`
            ).toString("hex");

            return encryptedPassword;

        } catch (error) {
            debug({ error });
            return "";
        }
    },

    makeSalt: function () {
         return crypto.randomBytes(16).toString("hex");
    },

    comparePassword: function (password) {
        return this.hashedPassword === this.encryptPassword(password);
    }
}

userSchema.virtual("password")
    .set(function (password =  crypto.randomBytes(16).toString()) {
         if (!password) return;

         this.salt = this.makeSalt();
         this.hashedPassword = this.encryptPassword(password);
    })



module.exports = {Users: Mongoose.model("User", userSchema, "users")};
