const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require("../model/index")
const {set, get } = require('../db/redis')


// 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 60 * 60 * 24 * 1000)

    return d.toGMTString()
}

const userRouterHandle = (req, res) => {

    const method = req.method
    if (method === 'GET' && req.path === '/api/user/login') {
        const obj = { username: req.query.username, password: req.query.password }
        return userLogin(obj).then(result => {
            if (result) {
                // 设置session
                req.session.username = result.username;
                req.session.realname = result.realname;
                // 同步到redis中
                set(req.sessionId, result)

                // res.setHeader('Set-Cookie', `username=${result.username} ; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModal(result)
            }
            return new ErrorModal('登录失败')
        })
    }
}
module.exports = userRouterHandle