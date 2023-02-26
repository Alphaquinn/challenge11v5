const router = require("express").Router();
const cache = require("../db/cache")



//all notes route

router.get("/notes", (req,res)=>{
    cache
    .getNotes()
    .then((notes)=>{
        return res.json(notes);
    })
    .catch((err)=> res.status(500).json(err));
    
});




//for creating new notes(post route)


router.post("/notes", (req, res)=> {
   cache
   .addNote(req.body)
   .then((note)=>res.json(note))
   .catch((err)=>res.status(500).json(err));
});

//this route is for delteing notes(need those extra points)

router.delete("/notes/:id",(req,res)=>{
    const noteId = req.params.id;
    cache
    .removeNoteById(noteId)
    .then(()=>res.sendStatus(204))
    .catch((err)=>res.status(500));
});



module.exports=router