const { execSql, escape } = require("../db/index")
const { genPassword } = require('../utils/crypto')
const User = require("../models/User")

const userLogin = async(data) => {

    // const { password, username } = data
    // let ps = escape(genPassword(password))

    // let userName = escape(username)
    // let sql = `select username,realname from users where username=${userName} and password=${ps} `
    // console.log(sql, '==sql')
    // return execSql(sql).then(rows => {
    //     console.log('rows:', rows)
    //     if (rows[0]) {
    //         return rows[0]
    //     }
    //     return null
    // })

    // 生成加密密码
    let password = genPassword(data.password)
    const user = await User.findOne({
        username: data.username,
        password
    })
    if (user == null) return {}
    return user
}
module.exports = {
    userLogin
}