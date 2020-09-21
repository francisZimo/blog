const userLogin = (data) => {

    const { password, author } = data
    if (author === 'francis' && password === 'zimo') {
        return true
    }
    return false

}
module.exports = {
    userLogin
}