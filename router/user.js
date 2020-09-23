const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require("../model/index")

const userRouterHandle = (req, res) => {

    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        return userLogin(req.body).then(result => {
            if (result) {
                return new SuccessModal(result)
            }
            return new ErrorModal('登录失败')
        })
    }
}
module.exports = userRouterHandle