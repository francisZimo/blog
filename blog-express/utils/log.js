const fs = require('fs')
const path = require('path')

//写日志
const writeFile = (writeSteam, logs) => {
    writeSteam.write(logs + '\n')
}

// 创建 wire steam
const createWriteStream = (fileName) => {
    let filePath = path.join(__dirname, '../', 'logs', fileName)
    console.log(filePath, '==filePath')
    const writeSteam = fs.createWriteStream(filePath, {
        flags: 'a'
    })
    return writeSteam
}
const wirteSteam = createWriteStream('access.log')
const access = (logs) => {
    writeFile(wirteSteam, logs)
}

module.exports = {
    access
}