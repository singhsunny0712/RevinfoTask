const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;


const listSchema=new mongoose.Schema({
    listdata:{
        type:String,
        required:true
    },
    liststatus:{
        type:String,
        required:true
    }
})

mongoose.model("List",listSchema);