const http = require('http')
const slice = Array.prototype.slice
class LikeExpress {
    constructor() {
            // 存放中间件的列表
            this.routers = {
                all: [], // app.use(..) 中间件
                get: [],
                post: []
            }
            this.curIndex = 0
        }
        // 收集中间件
    register(path) {
        this.curIndex++;
        let info = {}
        info.indexOrder = this.curIndex
        if (typeof path === 'string') {
            info.path = path
                // 从第二个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
                // 从第一个参数开始，转换为数组，存入stack
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routers.all.push(info)

    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routers.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routers.post.push(info)
    }


    // 根据url和方法匹配到对应的要执行的中间件序列
    match(url, method) {
            let stack = []
            if (url === '/favicon.icon') {
                return stack
            }


            const allStack = this.routers.all

            const resetStack = this.routers[method]

            const totalStack = [...allStack, ...resetStack]
                // 中间件先后执行排序
            const sortList = totalStack.sort((a, b) => {
                return a.indexOrder > b.indexOrder
            })
            sortList.forEach((info) => {

                if (url.indexOf(info.path) === 0) {

                    stack = [...stack, ...info.stack]
                }
            })

            return stack

        }
        // 依次处理中间件
    handleStack(req, res, stack) {

        const next = () => {
            const middelWare = stack.shift()
                // console.log(middelWare.toString())
            if (middelWare) {
                middelWare(req, res, next)
            }
        }
        next()
    }
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader("Content-type", "application/json")
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url;
            const method = req.method.toLowerCase()
            const stackList = this.match(url, method)


            this.handleStack(req, res, stackList)



        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)

    }
}
// 工厂函数
module.exports = () => {
    return new LikeExpress()
}