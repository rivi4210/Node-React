const express = require("express")
const router = express.Router()

const {createNewExam,getAllExams,getLessonById,updateLesson,getAllMyExams}=require ("../Controller/examController")
const verifyJWT = require("../MiddleWare/verifyJWT")

router.post("/",verifyJWT,createNewExam)
router.get("/",verifyJWT,getAllExams)
router.get("/:id",verifyJWT,getLessonById)
router.get("/level/:level",getAllMyExams)
router.put("/",verifyJWT,updateLesson)
// router.delete("/",verifyJWT,deleteLesson)

module.exports = router
