// 对应user集合

const mongoose = require('../db')
    // 用Schema 定义数据规范
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, //必须
        unique: true // 唯一，不能重复
    },
    password: String,
    realname: String
})

// Model对应collection
const User = mongoose.model('user', UserSchema)

module.exports = User