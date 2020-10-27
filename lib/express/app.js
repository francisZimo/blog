const express = require('./like-express')
const app = express()

app.use((req, res, next) => {
    console.log('处理请求')
    next()
})

app.use((req, res, next) => {
    console.log('设置cookie')
    req.cookie = {
        userName: 'francis'
    }
    next()
})

const checkLogin = (req, res, next) => {
    console.log('验证成功')
    next()

    // res.json({
    //     error: -1,
    //     msg: '登录失败'
    // })
}

app.use('/api', checkLogin, (req, res, next) => {
    console.log('/api请求')

    next()
})

app.get('/api/getCookie', (req, res, next) => {
    console.log('get /api/getCookie===')

    // next()
})

app.post('/api/getCookie', (req, res, next) => {
    console.log('post /api/getCookie===')

    next()
})

app.use('/api/getCookie2', (req, res, next) => {
    console.log('/api/getCookie请求')
    res.json({
        error: 0,
        data: req.cookie
    })
})

app.use((req, res, next) => {
    console.log('处理404')
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})

app.listen('3001', () => {
    console.log('3001端口监听中')
})