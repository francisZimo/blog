const { execSql } = require('../db/index')
const _ = require('lodash')
const getBlogList = (author, keyword) => {
    let sql = 'select * from blogs where 1=1   '
    if (author) {
        sql += `and author =  '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += 'order by createtime desc;'

    return execSql(sql).then(result => {
        return result
    })
}

const getBlogDetail = (id) => {
    let sql = 'select * from blogs where 1=1   '
    if (id) {
        sql += `and id =  '${id}' `
    }

    return execSql(sql).then(result => {
        return result
    })
}

const newBlog = (blogData) => {
    const { title, content, createtime, author } = blogData
    let sql = `insert into blogs(title,content,createtime,author) values('${title}','${content}',${createtime},'${author}') ; `
    return execSql(sql).then(info => {
        return {
            id: info.insertId
        }
    })
}

const updateBlog = (id, author, blogData) => {
    const { title, content } = blogData
    let sql = `update blogs set title='${title}' , content='${content}' where id=${id} and author='${author}'`
    return execSql(sql).then(info => {

        if (info.affectedRows > 0) {
            return true
        }
        return false
    })

}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`
    return execSql(sql).then(info => {
        if (info.affectedRows > 0) {
            return true
        }
        return false
    })
}


module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
}