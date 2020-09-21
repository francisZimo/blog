class BaseModel {
    constructor(data, msg) {
        if (typeof data === 'string') {
            this.msg = data
        }
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
        }
    }

}
class SuccessModal extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.errno = 0
    }
}

class ErrorModal extends BaseModel {
    constructor(data, msg) {
        super(data, msg)
        this.errno = -1
    }
}

module.exports = {
    SuccessModal,
    ErrorModal
}