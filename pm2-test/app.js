const express = require('express')

const app = new express()

app.get('/', (req, res) => {
    console.log('pm 访问成功')
    console.error('权限失败')
    res.json({
        msg: '重新启动'
    })
})
app.get('/err', (req, res) => {
    throw new Error('模式失败')
    res.json({
        msg: '进程失败'
    })
})

app.listen('8015', () => {
    console.log('启动成功')
})