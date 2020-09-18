const blogRouter = require('./router/blog')
const userRouter = require('./router/user')
const serverHandle = (req, res) => {
    res.setHeader('Content_type', 'application/json')
    req.path = req.url.split('?')[0]
    let blogData = blogRouter(req, res)
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }
    let userData = userRouter(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }
    res.writeHead(404, {
        "Content-type": 'text/plain'
    })
    res.write("404 not found")
    res.end()
}
module.exports = serverHandle