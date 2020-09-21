const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require("../model/index")
const userRouterHandle = (req, res) => {

    const method = req.method
    if (method === 'POST' && req.path === '/api/blog/login') {
        let data = userLogin(req.body)
        if (!data) {
            return new ErrorModal('登录失败')
        }
        return new SuccessModal()
    }

}
module.exports = userRouterHandle