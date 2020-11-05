const http = require('http')

class LikeKoa {
    constructor() {
        this.middeleWareList = []
    }
    use(...args) {
        this.middeleWareList.push(...args)
        return this
    }

    compose(middleWareList) {
        return (ctx) => {
            const dispatch = (i) => {
                const fn = middleWareList[i]
                try {
                    return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
                } catch (err) {

                }

            }
            return dispatch(0)
        }

    }

    createCxt(req, res) {
        const ctx = {
            req,
            res
        }
        return ctx
    }

    handleRquest(fn, ctx) {
        fn(ctx)
    }

    callback() {
        let fn = this.compose(this.middeleWareList)
        return (req, res) => {
            const ctx = this.createCxt(req, res)
            this.handleRquest(fn, ctx)
        }
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)

    }
}

module.exports = LikeKoa