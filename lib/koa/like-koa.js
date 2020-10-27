const http = require('http')

// 组合中间件
function compose(middleWareList) {
    return function(ctx) {
        function dispatch(i) {
            const fn = middleWareList[i]
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}

class LikeKoa2 {
    constructor() {
        this.middleWareList = []
    }

    use(middleWare) {
        this.middleWareList.push(middleWare)
        return this
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx

    }
    handleRquest(ctx, fn) {
        return fn(ctx)

    }
    callback() {
        const fn = compose(this.middleWareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRquest(ctx, fn)
        }
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)

    }


}

module.exports = LikeKoa2