const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'myblog'

MongoClient.connect(
    url, {
        useUnifiedTopology: true
    }, (err, client) => {
        if (err) {
            console.error('连接失败', err)
            return
        }

        // 没有报错，说明连接成功
        console.log('连接成功')
            //切换到数据库（use myblog）
        const db = client.db(dbName)

        // 关闭连接
        // client.close()

    }
)