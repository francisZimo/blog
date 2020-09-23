const { execSql } = require("../db/index")
const userLogin = (data) => {

    const { password, username } = data
    let sql = `select username,realname from users where username='${username}' and password='${password}' `
    return execSql(sql).then(rows => {
        console.log('rows,',
            rows)
        return rows[0]
    })
}
module.exports = {
    userLogin
}