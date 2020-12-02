const mongoose = require('mongoose')
const { nanoid } = require('nanoid')

const Team = mongoose.model('Team', {
    _id: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    members: [String],
    teamName: {
        type: String,
        required: true,
    },
    leader: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
    },
    teamPic: {
        type: String,
        required: true,
    },
    tasks: [String]
})

module.exports = { Team }
