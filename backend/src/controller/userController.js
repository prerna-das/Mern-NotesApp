const Note =require("../model/Note.js")
async function readAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt:-1});// by default createdAt is 1 if we do -1 then it means the newest note must be displayed first.
        return res.status(200).json(notes)
    }
    catch(err){
        console.log("Error in realAllNotes controller",err)
        return res.status(500).json({message:"Internal Server Error!!"})
    }  
}
// get a specific note
async function readOneNote(req,res){
    try{
        const readNote=await Note.findById(req.params.id)
        if(!readNote)
        {
            res.status(404).json({message:"NOTE NOT FOUND "}) 
        }
        return res.status(200).json(readNote)        
    }
    catch(err){
        console.log("Error in readOneNote controller",err)
        return res.status(500).json({message:"Internal Server Error!!"})
    }
}

//Create a new note
async function createNotes(req,res){
    try{
        let {title,content}=req.body;// fetches title and conent from the client
        const newNote=new Note({title:title,content:content})// makes a new document and adds title and content in it
        const savedNote=await newNote.save()// saves the document in the db
        //res.status(201).json({message:"Notes created successfully"}) //instead on this we can return the new created note
        return res.status(201).json(savedNote)
    }
    catch(err){
        console.log("Error in createNotes controller",err)
        return res.status(500).json({message:"Internal Server Error!!"})
    }
}
// TO UPDATE THE  feilds in NOTES
async function updateNotes(req,res){
    let {title,content}=req.body;
    const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content}, {new:true});// new:true means reflect updated changes in old feilds
    if(!updatedNote){
        return res.status(404).json({message:"Note not found"})
    }
    return res.status(200).json({updatedNote})
    }


async function deleteNotes(req,res){
    try{
        const delNote= await Note.findByIdAndDelete(req.params.id)
        if(!delNote){
            return res.status(404).json({message:"Note not found"})
        }
        return res.status(200).json({message:"note deleted successfully"})
    }
    catch(err){
        console.log("Error in deleteNotes controller",err);
        res.status(500).json({message:"Internal Server Error!!"})

    }
}
module.exports={readAllNotes,readOneNote,createNotes,updateNotes,deleteNotes}// import these in routes/notesRouter.js