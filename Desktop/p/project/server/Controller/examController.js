const Exam = require("../Model/examModel")
const Lesson = require("../Model/lessonModel")


const createNewExam = async (req, res) => {
    if (req.user.role == "user") {
        const user = req.user._id
        // console.log('body', req.body);
        const { exam } = req.body
        const mark = exam.mark
        const lesson = exam.lesson
        console.log(mark);
        if (!mark) return res.status(400).send("mark is require!")
        await Exam.create({ user, mark, lesson })
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
        console.log(req.user._id)
        const _idUser = req.user._id
        const allExams = await Exam.find({ user: _idUser }).lean()
        // const ExamsWithLesson =await Promise.all( allExams.map(async (e) => { await Lesson.findOne({ _id: e.lesson }).lean() }))
        const ExamsWithLesson = await Promise.all(allExams.map(async (e) => {
            // return {lesson: await Lesson.findOne({ _id: e.lesson }).lean(),mark:e.mark} 
            const currentLesson=await Lesson.findOne({ _id: e.lesson }).lean()
            return {level:currentLesson.level,category:currentLesson.category,mark:e.mark}
            
        }));
        console.log(ExamsWithLesson);
        return res.json(ExamsWithLesson)
    }
    return res.json({ msg: "permission denied" })
}

const getLessonById = async (req, res) => {
    if (req.user.role == "admin") {
        const { id } = req.params
        if (!id) return res.status(400).send("id is require!")
        const lesson = await Exam.find({ _id: id })
        if (!lesson?.length) return res.status(400).send("not exist!")
        return res.json(lesson)
    }
    return res.json({ msg: "permission denied" })
}

const updateLesson = async (req, res) => {
    if (req.user.role == "user") {
        const { mark, user, lesson } = req.body
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

module.exports = { createNewExam, getAllExams, getAllMyExams, getLessonById, updateLesson }