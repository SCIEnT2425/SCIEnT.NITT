const mongoose=require("mongoose");
const projectSchema=new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description:{
        type:String,
        required:true,
    },
    club:{
        type:mongoose.Schema.ObjectId,
        ref:"Club",
        required:true,
    },
    image:{
        url:String,
        filename:String
    }
});

module.exports=mongoose.model("Project",projectSchema);