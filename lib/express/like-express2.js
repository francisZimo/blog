const http = require('http')
const slice = Array.prototype.slice;

class LikeExpress {
    constructor() {
        this.routers = {
            all: [],
            get: [],
            post: []
        }
    }

    register(path) {
        let info = {}
        if (typeof path === 'string') {
            info.path = path
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const middleWare = this.register.apply(this, arguments)
        this.routers.all.push(middleWare)

    }
    get() {
        const middleWare = this.register.apply(this, arguments)
        this.routers.get.push(middleWare)
    }
    post() {
            const middleWare = this.register.apply(this, arguments)
            this.routers.post.push(middleWare)
        }
        // 匹配中间件
    match(url, method) {
        // 存储中间件
        let stack = []
        if (url === '/favicon') {
            return stack
        }
        const allStack = this.routers.all;
        const otherStack = this.routers[method]
        const totalStack = [...allStack, ...otherStack]
        totalStack.forEach(info => {
            if (url.indexOf(info.path) === 0) {
                stack = [...stack, ...info.stack]
            }
        })
        return stack;
    }

    handleStack(req, res, stack) {
        const next = () => {
            const middleWare = stack.shift()
            if (middleWare) {
                middleWare(req, res, next)
            }
        }
        next()
    }

    handleServer() {
        const callback = (req, res) => {
            res.json = (data) => {
                res.setHeader('Content_Type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            const method = req.method.toLowerCase()
            const list = this.match(url, method)
            this.handleStack(req, res, list)
        }
        return callback
    }
    listen(...args) {
        const server = http.createServer(this.handleServer())
        server.listen(...args)
    }



}

module.exports = () => {
    return new LikeExpress()
}