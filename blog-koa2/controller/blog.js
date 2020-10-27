const { execSql } = require('../db/index')
const _ = require('lodash')
const getBlogList = async(author, keyword) => {
    let sql = 'select * from blogs where 1=1   '
    if (author) {
        sql += `and author =  '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += 'order by createtime desc;'
    return await (execSql(sql))

}

const getBlogDetail = async(id) => {
    let sql = 'select * from blogs where 1=1   '
    if (id) {
        sql += `and id =  '${id}' `
    }
    let result = await (execSql(sql))
    return result[0]

}

const newBlog = async(blogData) => {
    const { title, content, createtime, author } = blogData
    let sql = `insert into blogs(title,content,createtime,author) values('${title}','${content}',${createtime},'${author}') ; `
    let result = await execSql(sql)

    return {
        id: result.insertId
    }

}

const updateBlog = async(id, author, blogData) => {
    const { title, content } = blogData
    let sql = `update blogs set title='${title}' , content='${content}' where id=${id} and author='${author}'`
    let result = await execSql(sql)
    if (result.affectedRows > 0) {
        return true
    }
    return false


}

const deleteBlog = async(id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`
    let result = await execSql(sql)
    if (result.affectedRows > 0) {
        return true
    }
    return false

}


module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
}