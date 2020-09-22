const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/index')
const { execSql } = require('../db/index')

const blogRouterHandle = (req, res) => {

    const method = req.method
    const query = req.query
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = query.author || ''
        let keyword = query.keyword || ''
        return getBlogList(author, keyword).then(result => {
            if (result) {
                return new SuccessModal(result)
            }
            return new ErrorModal('处理数据失败')
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        let id = query.id
        const dataDetail = getBlogDetail(id)
        if (dataDetail) {
            return new SuccessModal(dataDetail)
        }
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        let data = newBlog(req.body)
        if (data) {
            return new SuccessModal(data)
        }
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        let data = updateBlog(query.id, req.body)
        if (!data) {
            return new ErrorModal('编辑失败')
        }
        return new SuccessModal()
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        let data = deleteBlog(query.id)
        if (!data) {
            return new ErrorModal('删除失败')
        }
        return new SuccessModal()
    }
}


module.exports = blogRouterHandle