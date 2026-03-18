const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    mobile: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/ , "Invalid email"]

    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

userSchema.pre('save' , async function(next){
   const count = await model("User").countDocuments({mobile: this.mobile})
   if(count>0) 
    throw next(new Error("Mobile number already exists"))

   next()
})
userSchema.pre('save', async function(next) {
    const count = await model("User").countDocuments({email: this.email})
    if(count>0)
        throw next(new Error("Email already exists!"))

    next()
})
userSchema.pre('save', async function(next) {
    const encryptedPassword = await bcrypt.hash(this.password.toString(), 12)
    this.password = encryptedPassword
    next()
})

const UserModel = model("User", userSchema)
module.exports = UserModel