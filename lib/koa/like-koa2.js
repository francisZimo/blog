const http = require('http')

function compose(middleWareList) {
    return (ctx) => {
        function dispatch(i) {
            let fn = middleWareList[i]
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)

    }
}

class LikeKoa {
    constructor() {
        this.middleWareList = []
    }

    use(middleWare) {
        this.middleWareList.push(middleWare)
        return this
    }

    createCtx(req, res) {
        let ctx = {
            req,
            res
        }
        return ctx;

    }

    handleRequest(ctx, fn) {
        fn(ctx)
    }

    callback() {
        let fn = compose(this.middleWareList)
        return (req, res) => {
            const ctx = this.createCtx(req, res)
            this.handleRequest(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }


}

module.exports = LikeKoa