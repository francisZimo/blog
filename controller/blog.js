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
    return {
        title: '最强战力',
        content: 'zz最强'
    }
}

const newBlog = (blogData) => {
    return {
        id: 2,
        content: 'zimo'
    }
}

const updateBlog = (id, content) => {
    return true
}

const deleteBlog = (id) => {
    return true
}


module.exports = {
    getBlogList,
    getBlogDetail,
    newBlog,
    updateBlog,
    deleteBlog
}