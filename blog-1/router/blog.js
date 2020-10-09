const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/index')
const { execSql } = require('../db/index')

const checkLogin = (req) => {
    if (!req.session.username) {
        return Promise.resolve("尚未登录")
    }
}

const blogRouterHandle = (req, res) => {

    const method = req.method
    const query = req.query
    let author = req.session.username
    if (method === 'GET' && req.path === '/api/blog/list') {


        let author = query.author || ''
        let keyword = query.keyword || ''
        if (req.query.isadmin) {
            // 管理员页面
            const checkResult = checkLogin(req)
            if (checkResult) {
                // 未登录
                return checkResult
            }
            author = req.session.username
        }

        return getBlogList(author, keyword).then(result => {
            if (result) {
                return new SuccessModal(result)
            }
            return new ErrorModal('暂无信息')
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const checkResult = checkLogin(req)
        if (checkResult) {
            return checkResult
        }
        let id = query.id
        return getBlogDetail(id).then(result => {
            if (result) {
                return new SuccessModal(result)
            }
            return new ErrorModal('处理数据失败')
        })

    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        const checkResult = checkLogin(req)
        if (checkResult) {
            return checkResult
        }
        const { body } = req

        let blogData = {
            title: body.title,
            content: body.content,
            createtime: Date.now(),
            author: req.author
        }
        return newBlog(blogData).then(result => {
            return new SuccessModal(result)
        })

    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        const checkResult = checkLogin(req)
        if (checkResult) {
            return checkResult
        }
        return updateBlog(query.id, author, req.body).then(result => {
            if (!result) {
                return new ErrorModal('更新失败')
            }
            return new SuccessModal(result)
        })

    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const checkResult = checkLogin(req)
        if (checkResult) {
            return checkResult
        }
        return deleteBlog(query.id, author).then(result => {
            if (!result) {
                return new ErrorModal('删除失败')
            }
            return new SuccessModal()
        })

    }
}


module.exports = blogRouterHandle