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

        // 使用集合
        const userCollection = db.collection("users")

        // 新增
        // userCollection.insertOne({
        //     username: 'zimo',
        //     password: 'abc',
        //     realname: '图图'
        // }, (err, result) => {
        //     if (err) {
        //         console.error('users insert error', err)
        //         return
        //     }
        //     console.log(result)
        // })

        // 修改
        // userCollection.updateOne({
        //     username: 'zimo' // 查询条件
        // }, {
        //     $set: { realname: "刘图图" } // 修改内容，注意$set
        // }, (err, result) => {
        //     if (err) {
        //         console.error('修改失败', err)
        //     }
        //     console.log('修改成功')
        //     return result

        // })

        // 删除

        userCollection.deleteOne({
            "username": 'zimo3'
        }, (err, result) => {
            if (err) {
                console.log('删除失败')
                return
            }
            console.log('删除成功')
            client.close()
        })

        // 查询
        userCollection.find().toArray((err, result) => {
                if (err) {
                    console.log('users find error', err)
                }
                console.log(result)
                client.close()
            })
            // 关闭连接
            // client.close()

    }
)