// Imports all the required modules and files
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder static
app.use(express.static("public"));
// Uses noteRouter.js for the /api/notes route
require("./routes/notesRouter")(app);
require("./routes/htmlroutes")(app);
// Listens for use in App
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
