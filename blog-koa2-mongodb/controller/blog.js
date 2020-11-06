const { execSql } = require('../db/index')
const Blog = require('../models/Blog')
const _ = require('lodash')
const xss = require('xss')
const User = require('../models/Blog')
const getBlogList = async function(author, keyword) {
    // let sql = 'select * from blogs where 1=1   '
    // if (author) {
    //     sql += `and author =  '${author}' `
    // }
    // if (keyword) {
    //     sql += `and title like '%${keyword}%' `
    // }
    // sql += 'order by createtime desc;'
    // return await (execSql(sql))

    const whereOptions = {}
    if (author) whereOptions.author = author
    if (keyword) whereOptions.title = new RegExp(keyword)
    console.log(whereOptions, '==neirong')
    let list = await User.find(whereOptions).sort({ _id: -1 })
    console.log('list', list)
    return list
        // return new Promise.resolve(list)


}

const getBlogDetail = async(id) => {
    // let sql = 'select * from blogs where 1=1   '
    // if (id) {
    //     sql += `and id =  '${id}' `
    // }
    // let result = await (execSql(sql))
    // return result[0]
    const blogDetail = await Blog.findOne({ _id: id })
    return blogDetail
}

const newBlog = async(blogData) => {
    const { title, content, createtime, author } = blogData
    // let sql = `insert into blogs(title,content,createtime,author) values('${title}','${content}',${createtime},'${author}') ; `
    // let result = await execSql(sql)

    // return {
    //     id: result.insertId
    // }

    const blog = await Blog.create({
        title: xss(title),
        content: xss(content),
        author
    })
    return {
        id: blog._id
    }

}

const updateBlog = async(id, author, blogData) => {
    // const { title, content } = blogData
    // let sql = `update blogs set title='${title}' , content='${content}' where id=${id} and author='${author}'`
    // let result = await execSql(sql)
    // if (result.affectedRows > 0) {
    //     return true
    // }
    // return false
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const blog = await Blog.findOneAndUpdate({
        _id: id
    }, {
        title,
        content
    }, { new: true })
    if (blog == null) return false
    return true

}

const deleteBlog = async(id, author) => {
    // let sql = `delete from blogs where id=${id} and author='${author}';`
    // let result = await execSql(sql)
    // if (result.affectedRows > 0) {
    //     return true
    // }
    // return false
    const blog = await Blog.findOneAndDelete({ _id: id, author })
    if (!blog) return false
    return true

}


module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
}