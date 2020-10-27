const router = require('koa-router')()
const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/index')
const xss = require('xss')
const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/blog')

router.get('/list', async function(ctx, next) {
    console.log('mrogan日志记录')
    let author = ctx.query.author || ''
    let keyword = ctx.query.keyword || ''

    if (ctx.query.isadmin) {

        // 管理员页面
        if (ctx.session.username == null) {
            // 未登录
            ctx.body = new ErrorModal('未登录')

            return
        }
        author = ctx.session.username
    }
    let blogList = await getBlogList(author, keyword)
    if (blogList) {
        ctx.body = new SuccessModal(blogList)
        return
    }
    ctx.body = new ErrorModal('暂无信息')
})


router.get('/detail', async(ctx, next) => {

    let id = ctx.query.id
    let result = await getBlogDetail(id)
    if (result) {
        ctx.body = new SuccessModal(result)
        return
    }
    ctx.body = new ErrorModal('处理数据失败')

})

router.post('/new', loginCheck, async(ctx, next) => {

    const { body } = ctx.request

    let blogData = {
        title: xss(body.title),
        content: body.content,
        createtime: Date.now(),
        author: ctx.session.username
    }
    let result = await newBlog(blogData);
    ctx.body = new SuccessModal(result)


})

router.post('/update', loginCheck, async(ctx, next) => {
    let result = await updateBlog(ctx.request.query.id, ctx.session.username, ctx.request.body)

    if (!result) {
        ctx.body = new ErrorModal('更新失败')
        return
    }
    ctx.body = new SuccessModal(result)
})

router.post('/del', loginCheck, async(ctx, next) => {
    let result = await deleteBlog(ctx.request.query.id, ctx.session.username)
    if (!result) {
        ctx.body = new ErrorModal('删除失败')
        return
    }
    ctx.body = new SuccessModal()

})

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0;
//     }
//     session.viewNum++;
//     res.json({
//         viewNum: session.viewNum
//     })
// })


module.exports = router