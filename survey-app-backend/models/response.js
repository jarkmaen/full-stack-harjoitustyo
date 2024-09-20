const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    response: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            optionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Option'
            },
            otherText: {
                type: String
            }
        }
    ]
})

const Response = mongoose.model('Response', responseSchema)

module.exports = Response