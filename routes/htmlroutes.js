const path = require("path");
module.exports= function(app){
    const noteRouter = require("./notesRouter");
    
    app.use("/api/notes", noteRouter);
    // GET Route for notes page
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    
    // GET Route for homepage
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}