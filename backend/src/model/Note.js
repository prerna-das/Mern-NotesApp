// this contains the schema and model for db
const mongoose=require("mongoose");

//1. create a schema (what are the data types of feild we will be storing in the database for each card)
const NoteSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true 
    }
    },
    {timestamps:true} //created Date and updated Date
)
//2. create a model based off the Schema i.e collection that will be created in db
const Note=mongoose.model("Note",NoteSchema)// Note is collection name ,create a collection named Note based of Note Schema
module.exports=Note;// import it in userController
