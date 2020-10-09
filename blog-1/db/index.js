const mySql = require('mySql')
const { MYSQL_CONF } = require("../config/index")
const con = mySql.createConnection(MYSQL_CONF)
con.connect()
const execSql = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
module.exports = {
    execSql
}