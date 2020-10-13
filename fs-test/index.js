const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, 'data.txt')

//读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(data.toString())
// })

//写入文件
// const content = '这是写入的内容\n'
// const conf = {
//     flag: 'a' // 追加写入。 覆盖用'w'
// }
// fs.writeFile(fileName, content, conf, err => {
//     if (err) {
//         console.log(err)

//     }
// })


//判断文件是否存在
fs.exists(fileName, (exists) => {
    console.log(exists)
})