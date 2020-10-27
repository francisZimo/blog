const router = require('koa-router')()
const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../model/index')
router.prefix('/api/user')
router.post('/login', async function(ctx, next) {
    console.log(ctx, '==ctx')
    const { username, password } = ctx.request.body
    const obj = { username, password }
    let result = await userLogin(obj)

    if (result) {
        // 设置session
        ctx.session.username = result.username;
        ctx.session.realname = result.realname;

        ctx.body = new SuccessModal(result)
        return
    }
    ctx.body(new ErrorModal('登录失败'))
})

// router.get('/', function(ctx, next) {
//     ctx.body = 'this is a users response!'
// })

// router.get('/bar', function(ctx, next) {
//     ctx.body = 'this is a users/bar response'
// })



module.exports = router