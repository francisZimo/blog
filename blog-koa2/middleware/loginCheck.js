const { ErrorModal } = require('../model')
const loginCheck = async(ctx, next) => {
    if (ctx.session.username) {
        await next()
        return
    }
    ctx.body = new ErrorModal('未登录')

}
module.exports = loginCheck