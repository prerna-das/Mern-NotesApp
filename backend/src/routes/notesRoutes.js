const express=require("express");
const {readAllNotes,readOneNote,createNotes,updateNotes,deleteNotes}=require("../controller/userController.js")
const router=express.Router();

router.get("/",readAllNotes)
router.get("/:id",readOneNote)
router.post("/",createNotes)
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)

module.exports= router;// export it to main -> server.js file

