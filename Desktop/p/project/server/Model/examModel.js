const mongoose = require("mongoose")

const examModel = new mongoose.Schema({
    mark: {
        type: String,
        require: true,
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Lesson"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

module.exports = mongoose.model('Exam', examModel)