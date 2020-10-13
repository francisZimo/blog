const blogRouter = require('./router/blog')
const userRouter = require('./router/user')
const queryString = require('querystring')
const {set, get } = require("./db/redis")
const { access } = require('./utils/log')
const _ = require('lodash')
    // 获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 60 * 60 * 24 * 1000)
    return d.toGMTString()
}

// session数据
const SESSION_DADA = {}

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
    access(`${req.method} __ ${req.url} __ ${req.headers['user-agent']} __ ${Date.now()} `)

    // 设置返回格式JSON
    res.setHeader('Content-type', 'application/json')
        // 获取Path
    req.path = req.url.split('?')[0]
        // 解析query
    req.query = queryString.parse(req.url.split('?')[1] || {})
        // 解析cookie
    const cookieStr = req.headers.cookie || '';
    req.cookie = {}
    cookieStr.split(';').forEach(item => {
        let data = item.split('=')
        let key = data[0] && data[0].trim()
        let value = data[1] && data[1].trim()

        req.cookie[key] = value
    });


    // 解析session
    // let needSetCookie = false // 是否需要设置cookie
    // let userId = req.cookie.userid
    // if (userId) {
    //     if (!SESSION_DADA[userId]) {
    //         SESSION_DADA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DADA[userId] = {}

    // }
    // req.session = SESSION_DADA[userId]

    // 使用redis
    let needSetCookie = false // 是否需要设置cookie

    let userId = req.cookie.userid
    if (!userId) {

        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            // 初始化session
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }

        return getPostData(req) // 处理postData
    }).then(postData => {
        req.body = postData
        req.author = req.session.username
            // 处理blog路由
        let blogResult = blogRouter(req, res)

        if (blogResult) {
            blogResult.then(result => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(result))

            })
            return
        }

        let userData = userRouter(req, res)
        if (userData) {
            userData.then(result => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(result))
            })
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