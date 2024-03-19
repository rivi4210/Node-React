const mongoose =require("mongoose")

const lessonModel=new mongoose.Schema({
    level:{
        type:String,
        require:true,
        enum:["level 1", "level 2",'level 3'],
    },
    category:{
        type:String,
        require:true,
    }
})

module.exports=mongoose.model('Lesson',lessonModel)