const express = require('express')

const app = new express()

app.get('/', (req, res) => {
    console.log('pm 访问成功')
    res.json({
        msg: '成功f'
    })
})

app.listen('8015', () => {
    console.log('启动成功')
})