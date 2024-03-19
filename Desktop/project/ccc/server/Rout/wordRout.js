const express = require("express")
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix+ '-' +file.originalname )
    }
})
// const upload = multer({ dest: './public/upload/' })
const upload = multer({ storage: storage })

const verifyJWT = require('../MiddleWare/verifyJWT')

const { createNewWord, getAllWords, getWordById, getWordsByLessonId, updateWord, deleteword } = require("../Controller/wordController")

router.post("/", upload.single('Img'), verifyJWT, createNewWord)
router.get("/", verifyJWT, getAllWords)
router.get("/:id", verifyJWT, getWordById)
router.get("/lesson/:lesson", getWordsByLessonId)
router.put("/", upload.single('Img'), verifyJWT, updateWord)
router.delete("/", verifyJWT, deleteword)

module.exports = router
