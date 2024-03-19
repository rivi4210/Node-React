const mongoose =require("mongoose")

const WordModel=new mongoose.Schema({
    word:{
        type:String,
        require:true
    },
    translating:{
        type:String,
        require:true,
    },
    Img:{
        type:String,
    },
    lesson:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Lesson"
    }
})


module.exports=mongoose.model('Word',WordModel)