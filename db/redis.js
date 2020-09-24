const redis = require('redis')
const { REDIS_CONF } = require("../config/index")
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})

function set(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
    console.log('设置成功', key, value)

}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }

            try {
                // 尝试转换json
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }


        })
    })
    if (key) {
        return redisClient.get(key)
    }

}
module.exports = {
    set,
    get
}