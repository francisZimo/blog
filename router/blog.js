const blogRouterHandle = (req, res) => {

    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        return {
            msg: '获取博客列表'
        }
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