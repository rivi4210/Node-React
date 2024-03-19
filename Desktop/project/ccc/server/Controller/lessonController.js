const Lesson=require("../Model/lessonModel")

const createNewLesson=async(req,res)=>{
    if(req.user.role=="admin"){
        
    const {level,category}=req.body
    console.log("kkkkkkkkkkkkkkkkkkkkk",{level,category});
    if(!level) return res.status(400).send("Level is require!")
    if(!category) return res.status(400).send("Category is require!")

    const checkLevelCategory=await (await Lesson.find({category,level})).map(less=>{ return {category:less.category,level:less.level}})
    // const checkUserName= User.find({userName: userName});
    console.log({checkLevelCategory});
    if(checkLevelCategory?.length) return res.status(401).send("level & category are exist!!")

    await Lesson.create({level,category})
    return res.json({level,category})
}
return res.json({msg:"permission denied"})
}

const getAllLessons= async(req,res)=>{
    if(req.user.role=="admin"){
    const allLessons=await Lesson.find().sort({category:1}).lean()
    return res.json(allLessons)
}
return res.json({msg:"permission denied"})
}

const getLessonsByLevel= async(req,res)=>{
    const {level}=req.params
    const allLessons=await Lesson.find({level}).sort({category:1}).lean()
    return res.json(allLessons)
}

const getLessonById=async(req,res)=>{
    if(req.user.role=="admin"){
    const {id}=req.params
    if(!id) return res.status(400).send("id is require!")
    // console.log(typeof(id));
    const lesson=await Lesson.find({_id:id})
    if(!lesson?.length) return res.status(400).send("not exist!")
    return res.json(lesson)
}
return res.json({msg:"permission denied"})
}

const updateLesson=async(req,res)=>{
    if(req.user.role=="admin"){
    const {_id,level,category}=req.body
    if(!_id) return res.status(400).send("id is require!")
    if(!level) return res.status(400).send("level is require!")
    if(!category) return res.status(400).send("category is require!")
  
    const lesson=await Lesson.find({_id})
    if(!lesson) return res.status(400).send("not exist")
    if(lesson.level!==level || lesson.category!==category ){
        const checkLevelCategory=await (await Lesson.find({category,level})).map(less=>{ return {category:less.category,level:less.level}})
            console.log({checkLevelCategory});
    if(checkLevelCategory?.length) return res.status(400).send("level & category are exist!!")
    }

    const less=await Lesson.findById(_id).exec()

    if(!less) return res.status(400).send("not found")

    less.category=category
    less.level=level

    const update = await less.save()

    return res.json(update)
}
return res.json({msg:"permission denied"})
}


const deleteLesson=async(req,res)=>{
    if(req.user.role=="admin"){
    const {_id}=req.body
    const less=await Lesson.findById(_id)
    if(!less) return res.status(400).send("not found")

    const result=await less.deleteOne()

    const deleted=`${_id} deleted`
    return res.send(deleted)

}
return res.json({msg:"permission denied"})
}

module.exports={createNewLesson,getAllLessons,getLessonById,getLessonsByLevel,updateLesson,deleteLesson}