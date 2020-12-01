const mongoose = require('mongoose')

const Notification = mongoose.model('Notification', {
    _id: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        default: "",
    },
    to: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isUnread: {
        type: Boolean,
        required: true
    }
})

module.exports = { Notification }
