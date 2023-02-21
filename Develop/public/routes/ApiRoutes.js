const router = require("express").Router();
const fs = require("fs");
const {v4: uuidv4}=require('uuid');


//all notes route

router.get("/notes", (req,res)=>{
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    res.json(db);
})




//for creating new notes(post route)


router.post("/notes", (req, res)=> {
    let note = req.body;
    note.id=uuidv4();
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    db.push(note);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.json(db);
})

//this route is for delteing notes(need those extra points)


router.delete("/notes/:id",(req,res)=>{
    let idNote = req.params.id;
    let db = fs.readFileSync("db/db.json");
    db = JSON.parse(db);
    let allNotes = db.filter(note=>note.id!==idNote);
    fs.writeFileSync("db/db.json", JSON.stringify(allNotes));
    res.json(allNotes);
})


module.exports=router