const Exam = require("../Model/examModel")

const createNewExam = async (req, res) => {
    if (req.user.role == "user") {
        const { user, mark, lesson } = req.body
        console.log("kkkkkkkkkkkkkkkkkkkkk", { user, mark });
        if (!user) return res.status(400).send("Level is require!")
        if (!mark) return res.status(400).send("Category is require!")

        const checkLevelCategory = await (await Exam.find({ lesson, user })).map(ex => { return { user: ex.user, mark: ex.mark, lesson: ex.lesson } })
        // const checkUserName= User.find({userName: userName});
        console.log({ checkLevelCategory });
        if (checkLevelCategory?.length) return res.status(401).send("level & category are exist!!")

        await Exam.create({ user: user, mark: mark, lesson: lesson })
        return res.json({ user: user, mark: mark, lesson: lesson })
    }
    return res.json({ msg: "permission denied" })
}

const getAllExams = async (req, res) => {
    if (req.user.role == "admin") {
        const allExams = await Exam.find().lean()
        return res.json(allExams)
    }
    return res.json({ msg: "permission denied" })
}
const getAllMyExams = async (req, res) => {
    if (req.user.role == "user") {
        const { _idUser } = req.params
        const allExams = await Exam.find({ user: _idUser }).lean()
        return res.json(allExams)
    }
    return res.json({ msg: "permission denied" })
}

// const getExamsByLesson = async (req, res) => {
//     const { _idUser } = req.params
//     const allLessons = await Exam.find({ :_idUser }).sort({ category: 1 }).lean()
//     return res.json(allLessons)
// }

const getLessonById = async (req, res) => {
    if (req.user.role == "admin") {
        const { id } = req.params
        if (!id) return res.status(400).send("id is require!")
        // console.log(typeof(id));
        const lesson = await Exam.find({ _id: id })
        if (!lesson?.length) return res.status(400).send("not exist!")
        return res.json(lesson)
    }
    return res.json({ msg: "permission denied" })
}

const updateLesson = async (req, res) => {
    if (req.user.role == "user") {
    const { mark, user, lesson } = req.body
    // if (!_id) return res.status(400).send("id is require!")
    if (!mark) return res.status(400).send("level is require!")
    if (!user) return res.status(400).send("category is require!")

    const less = await Exam.findOne({ user, lesson }).exec()
    if (!less) return res.status(400).send("not exist")
    console.log(less);
    less.mark = mark
    const update = await less.save()
    console.log('uuuup mark ', update);
    return res.json(update)
    }
    return res.json({ msg: "permission denied" })
}


// const deleteLesson = async (req, res) => {
//     if (req.user.role == "admin") {
//         const { _id } = req.body
//         const less = await Exam.findById(_id)
//         if (!less) return res.status(400).send("not found")

//         const result = await less.deleteOne()

//         const deleted = `${_id} deleted`
//         return res.send(deleted)

//     }
//     return res.json({ msg: "permission denied" })
// }

module.exports = { createNewExam, getAllExams, getAllMyExams, getLessonById, updateLesson }