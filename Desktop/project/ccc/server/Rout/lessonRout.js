const express = require("express")
const router = express.Router()

const {createNewLesson,getAllLessons,getLessonById,updateLesson,deleteLesson,getLessonsByLevel}=require ("../Controller/lessonController")
const verifyJWT = require("../MiddleWare/verifyJWT")

router.post("/",verifyJWT,createNewLesson)
router.get("/",verifyJWT,getAllLessons)
router.get("/:id",verifyJWT,getLessonById)
router.get("/level/:level",getLessonsByLevel)
router.put("/",verifyJWT,updateLesson)
router.delete("/",verifyJWT,deleteLesson)

module.exports = router
