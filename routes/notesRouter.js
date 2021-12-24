// Imports all the required modules
const { response } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/readwritesave.js");
module.exports= function (app){
  // GET method returns back data as json file
  app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
  });
  
  // POST gets data from req and makes it into newNote
  // Writes newNote to the file system using the readAndAppend function
  // returns an error if function fails to write the note to the file
  app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, "./db/db.json");
      response.json(newNote)
    } else {
      res.json("Error in posting a new note");
    }
  });
  
  // DELETE gets the id from the req parameter
  // Compares it to the notes IDs and deletes the matching repeating notes
  app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    const noteIndex = notes.findIndex(note => note.note_id === id);
    notes.splice(noteIndex, 1);
  
    writeToFile("./db/db.json", notes);
    console.log("")
    response.json(noteIndex)
  });
}

