const fs = require("fs")
const path = require("path")
const readline = require('readline')
let filePath = path.join(__dirname, '../', 'logs', 'access.log')
    // 穿件read steam
let readStream = fs.createReadStream(filePath)
    // 创建 readline对象
let rl = readline.createInterface({
    input: readStream
})
let sum = 0;
let chromeNum = 0;
rl.on('line', (lineData) => {
    if (!lineData) { return }
    let userAgent = lineData.split(" __ ")
    if (userAgent && userAgent[2].indexOf('Chrome') > -1) {
        chromeNum++
    }
    // 逐行读取
    sum++
})
rl.on('close', () => {
    console.log('Chrome占比：', chromeNum / sum)
})