import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'   // you forgot to import jwt

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: 60,   
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
        type: String,
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 characters"],
    },

}, { timestamps: true });


// password hashing before saving it
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// function to compare passwords
userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};


// access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(    // ❌ you wrote isJWT
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};


// refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};


export const User = mongoose.model("User", userSchema);


