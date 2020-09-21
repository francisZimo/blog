const getBlogList = (author, password) => {
    return [{
        id: 1,
        title: '天瑞',
        content: 'xxxx',
        createTime: 1600424143036,
        author: 'z1'
    }, {
        id: 2,
        title: '天瑞2',
        content: '222',
        createTime: 1600424160752,
        author: 'z2'
    }]
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