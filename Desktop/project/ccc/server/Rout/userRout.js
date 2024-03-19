const express = require("express")
const router = express.Router()

const {createNewUser,getAllUsers,getUsersById,updateUser,deleteUser}=require ("../Controller/userController")
const verifyJWT = require("../MiddleWare/verifyJWT")

router.post("/",verifyJWT,createNewUser)
router.get("/",verifyJWT,getAllUsers)
router.get("/:id",verifyJWT,getUsersById)
router.put("/",verifyJWT,updateUser)
router.delete("/",verifyJWT,deleteUser)
module.exports = router
