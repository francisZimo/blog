const express = require('express')
const router = express.Router()
const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/index')
const checkLogin = require('../middleware/loginCheck')
const xss = require('xss')
router.get('/list', (req, res, next) => {
    console.log('mrogan日志记录')
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    if (req.query.isadmin) {

        // 管理员页面
        if (req.session.username == null) {
            // 未登录
            res.json(
                new ErrorModal('未登录')
            )
            return
        }
        author = req.session.username
    }

    getBlogList(author, keyword).then(result => {
        if (result) {
            res.json(new SuccessModal(result))
            return
        }
        res.json(new ErrorModal('暂无信息'))
    })

})

router.get('/detail', (req, res, next) => {

    let id = req.query.id
    return getBlogDetail(id).then(result => {
        if (result) {

            res.json(new SuccessModal(result))
            return
        }
        res.json(new ErrorModal('处理数据失败'))
    })
})

router.post('/new', checkLogin, (req, res, next) => {

    const { body } = req

    let blogData = {
        title: xss(body.title),
        content: body.content,
        createtime: Date.now(),
        author: req.session.username
    }
    console.log('判断是否登录')
    newBlog(blogData).then(result => {
        res.json(new SuccessModal(result))
    })

})

router.post('/update', checkLogin, (req, res, next) => {

    return updateBlog(req.query.id, req.session.username, req.body).then(result => {
        if (!result) {
            res.json(new ErrorModal('更新失败'))
            return
        }
        res.json(new SuccessModal(result))

    })
})

router.post('/del', checkLogin, (req, res, next) => {

    return deleteBlog(req.query.id, req.session.username).then(result => {
        if (!result) {
            res.json(new ErrorModal('删除失败'))
            return
        }
        res.json(new SuccessModal())

    })
})

router.get('/session-test', (req, res, next) => {
    const session = req.session
    if (session.viewNum == null) {
        session.viewNum = 0;
    }
    session.viewNum++;
    res.json({
        viewNum: session.viewNum
    })
})

module.exports = router