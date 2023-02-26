const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');
const readFileAsync= util.promisify(fs.readFile);
const writeFileAsync= util.promisify(fs.writeFile);
class cache{
    read(){
        return readFileAsync('db/db.json','utf8');

    }
    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note));

    }
    getNotes(){
        return thisread().then((notes)=>{
            let parsedNotes;
try{
    parsedNotes=[].comcat(JSON.parse(notes));

}catch(err){
    parsedNotes=[];

}
return parsedNotes;
        });
    }
    addNote(note){
        const {title, text}=note;
        if(!title||!text){
            throw new Error("this notes title or text cannot be left blank");

        }

        const newNote ={title,text,id:uuidv1()};
        return this.getNotes()
        .then((notes)=>[...notes,newNote])
        .then((updateNotes)=> this.write(updateNotes))
        .then(()=>newNote);

        
    }

    removeNote(id){
        return this.getNotes()
        .then((notes)=>notes.filter((note)=>note.id!==id))
        .then((filteredNotes)=>this.write(filteredNotes));
    }




}

module.exports= new cache();

