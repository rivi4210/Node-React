const express = require("express")
const router = express.Router()
const multer = require("multer")

const verifyJWT = require('../MiddleWare/verifyJWT')

const { createNewQuest, getQuestionById, getQuestionsByLessonId, deleteQuestion, updateQuestion } = require("../Controller/questionController")

router.post("/", verifyJWT, createNewQuest)
// router.get("/", verifyJWT, getAllWords)
router.get("/:id", getQuestionById)
router.get("/lesson/:lesson", getQuestionsByLessonId)
router.put("/", verifyJWT, updateQuestion)
router.delete("/", verifyJWT, deleteQuestion)

module.exports = router
