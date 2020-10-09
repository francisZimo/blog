const serverHandle = require('../app')
const http = require('http')
const server = http.createServer(serverHandle)
const serverPort = 3002
server.listen(serverPort, () => {
    console.log('3002 端口正在启动')
})