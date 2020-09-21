const { getBlogList } = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../model/index')
const blogRouterHandle = (req, res) => {

    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        const query = req.query
        let author = query.author || ''
        let keyword = query.keyword || ''
        const listData = getBlogList(author, keyword)
        if (listData) {
            return new SuccessModal(listData)
        }
        return new ErrorModal('处理数据失败')

    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: '获取一篇博客的内容'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            msg: '新增博客'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: '更新博客'
        }
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '删除博客'
        }
    }
}


module.exports = blogRouterHandle