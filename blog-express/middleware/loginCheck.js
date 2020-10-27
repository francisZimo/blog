const { ErrorModal } = require('../model')
const loginCheck = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(new ErrorModal('未登录'))
}
module.exports = loginCheck