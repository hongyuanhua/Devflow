// level
// system: 1
// company announcement: 2
// team announcement: 3
// task: 4
// personal message: 5

const mongoose = require('mongoose')
const { nanoid } = require('nanoid')


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
        default: true
    }
})

module.exports = { Notification }
