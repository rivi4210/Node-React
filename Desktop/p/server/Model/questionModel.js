const mongoose = require("mongoose")

const questionModel = new mongoose.Schema({
    question: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    }, 
    optional: {
        type: [String],
        require: true,
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Exam"
    }
})

module.exports = mongoose.model('Question', questionModel)