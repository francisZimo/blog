const Blog = require('../models/Blog')


!(async function() {

    // 新建
    // const blog = Blog.create({
    //     title: '夏洛特日记2',
    //     content: '今天好天气2',
    //     author: 'zb2'

    // })
    // console.log(blog)
    //     // 获取列表
    // const list = await Blog.find({}).sort({ _id: -1 })
    // console.log(list)
    // 模糊查询
    // 正则表达式 ，模糊查询
    // const list = await Blog.find({
    //     title: /2/
    // }).sort({ _id: -1 })
    // console.log(list)
    // 根据id获取单个博客  返回为对象形式
    // const blog2 = await Blog.findById('5f9fbfcf7a5cf3b5659f8916')
    // console.log(blog2)


    // 修改博客(new: true 返回修改后的最新内容， 默认为false)
    // const res = await Blog.findOneAndUpdate({ _id: '5f9fbfcf7a5cf3b5659f8916' }, { content: '今天捡了钱包' }, { new: true })
    // console.log(res)

    // 删除
    const res = await Blog.findOneAndDelete({ _id: '5f9fbfcf7a5cf3b5659f8916' })
    console.log(res)

})()