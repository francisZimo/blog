const express = require('express')
const { SuccessModal, ErrorModal } = require('../model/index')
const router = express.Router()
const { userLogin } = require('../controller/user')

router.post('/login', (req, res, next) => {
    const obj = { username: req.body.username, password: req.body.password }
    return userLogin(obj).then(result => {

        if (result) {
            // 设置session
            req.session.username = result.username;
            req.session.realname = result.realname;

            res.json(new SuccessModal(result))
            return
        }
        res.json(new ErrorModal('登录失败'))
    })


})

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json(new SuccessModal('登录成功'))
        return
    }
    res.json(new ErrorModal('登录失败'))
})

module.exports = router