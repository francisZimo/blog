const blogRouter = require('./router/blog')
const userRouter = require('./router/user')
const queryString = require('querystring')
const _ = require('lodash')
    // const parse

// 用于获取post数据
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on("end", () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })

    })

}

const serverHandle = (req, res) => {
    // 设置返回格式JSON
    res.setHeader('Content-type', 'application/json')
        // 获取Path
    req.path = req.url.split('?')[0]
        // 解析query
    req.query = queryString.parse(req.url.split('?')[1] || {})
        //处理postData
    getPostData(req).then(postData => {
        req.body = postData
            // 处理blog路由
        let blogResult = blogRouter(req, res)

        if (blogResult) {
            blogResult.then(result => {
                res.end(JSON.stringify(result))

            })
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
    })

}
module.exports = serverHandle