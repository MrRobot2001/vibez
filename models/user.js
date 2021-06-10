const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: { type: String,defalut: 'user'},
    gender: { type: String, defalut: 'male'},
    mobile: { type: String, defalut: ''},
    website: { type: String, defalut: ''},
    followers: [{
        type: mongoose.Types.ObjectId,
        ref:'user'
    }],
    following: [{
        type: mongoose.Types.ObjectId,
        ref:'user'
    }],
    saved: [{type: mongoose.Types.ObjectId, ref:'user'}]
},{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)