const Word = require("../Model/wordModel")

const createNewWord = async (req, res) => {
    if (req.user.role == "admin") {
        // console.log(req);
        // console.log("role",req.user.role);
        const { word, translating, lesson } = req.body;
        console.log('aaaa',req.file);
        const imageUrl = (req.file?.filename? req.file.filename:""); 

        // console.log({ word, translating, Img, lesson });
        if (!word) return res.status(400).send("word is require!")
        if (!translating) return res.status(400).send("translating is require!")
        if (!lesson) return res.status(400).send("lesson is require!")
        console.log('after');
        const checkWTL = await  Word.find({ word, translating, lesson })
        // const checkUserName= User.find({userName: userName});
        // console.log({ checkWTL });
        if (checkWTL?.length) return res.status(400).send("Word& Translaion in this level are exist!!")

        const wordx = await Word.create({ word, translating, Img:imageUrl, lesson })
        return res.json(wordx)
    }
    return res.json({ msg: "permission denied" })
}


const getAllWords = async (req, res) => {
    if (req.user.role == "admin") {

        const allLessons = await Word.find().sort({word:1}).lean()
        return res.json(allLessons)
    }
    return res.json({ msg: "permission denied" })

}

const getWordsByLessonId = async (req, res) => {
    console.log("im Here getWordsByLessonId");
    const { lesson } = req.params
    console.log(lesson,'lrs');
    if (!lesson) return res.status(400).send("id is require!")
   
    const allWordsInLesson = await Word.find({ lesson: lesson }).sort({word:1})
console.log(allWordsInLesson);
    if(!allWordsInLesson?.length) return res.json({msg:"not exist in this lesson"})
    return res.json(allWordsInLesson)
}

const getWordById = async (req, res) => {
    if (req.user.role == "admin") {

        const { id } = req.params
        if (!id) return res.status(400).send("id is require!")
        const word = await Word.find({ _id: id })
        if (!word?.length) return res.status(400).send("not exist!")
        return res.json(word)
    }
    return res.json({ msg: "permission denied" })
}

const updateWord = async (req, res) => {
    if (req.user.role == "admin") { 
        const { _id, word, translating, lesson } = req.body
        console.log({ _id, word, translating,  lesson });
        if (!_id) return res.status(400).send("id is require!")
        if (!word) return res.status(400).send("word is require!")
        if (!translating) return res.status(400).send("translating is require!")
        if (!lesson) return res.status(400).send("lesson is require!")
        
        const wordd = await Word.findOne({ _id })
        console.log("word",wordd);
        const imageUrl = (req.file?.filename? req.file.filename:wordd.Img); 
        if (!wordd) return res.status(400).send("not exist")
        if (wordd.word !== word || wordd.translating !== translating || wordd.lesson !== lesson) {
            const checkWTL =  await Word.findOne({_id, word, translating, lesson })
            if (checkWTL?.length && checkWTL._id!==_id) return res.status(400).send("word & translating in this lesson are exist!!")
        }

        const ww = await Word.findById(_id).exec()

        if (!ww) return res.status(400).send("not found")

        ww.word = word
        ww.translating = translating
        ww.lesson = lesson
        console.log("image",imageUrl);
        ww.Img = imageUrl

        const update = await ww.save()

        return res.json(update)
    }
    return res.json({ msg: "permission denied" })
}


const deleteword = async (req, res) => {
    if (req.user.role == "admin") {
        const {_id } = req.body
        console.log("idddd",_id);
        const word = await Word.findById(_id)
        if (!word) return res.status(400).send("not found")

        await word.deleteOne()

        const deleted = `${_id} deleted`
        return res.send(deleted)

    }
    return res.json({ msg: "permission denied" })
}

module.exports = { createNewWord, getAllWords, getWordById, getWordsByLessonId, updateWord, deleteword }