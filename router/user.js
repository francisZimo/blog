const userRouterHandle = (req, res) => {

    const method = req.method
    if (method === 'POST' && req.path === '/api/blog/login') {
        return {
            msg: '博客登录'
        }
    }

}
module.exports = userRouterHandle