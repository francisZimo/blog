// 标准输入输出
//process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         req.pipe(res)
//     }

// })
// server.listen(8005)

// 复制文件
// const fs = require('fs')
// const path = require('path')
// const filename1 = path.resolve(__dirname, 'data.txt')
// const filename2 = path.resolve(__dirname, 'data-bak.txt')
// const copyFile = fs.createReadStream(filename1)
// copyFile.pipe(fs.createWriteStream(filename2))
// copyFile.on('end', () => {
//     console.log('拷贝完成')
// })
// copyFile.on('data', (chunk) => {
//     console.log(chunk.toString(), '==chunk')
// })

// 网络请求流

const http = require('http')
const fs = require('fs')
const path = require('path')

const filename1 = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.createReadStream(filename1).pipe(res)
            // req.pipe(res)
    }

})
server.listen(8005, () => {
    console.log('开始监听')
})