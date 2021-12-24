// imports require fs and util to the file system
const fs = require("fs");
const util = require("util");

// read file to an asynchronus file system 
const readFromFile = util.promisify(fs.readFile);

// data given to file system at a destination and data
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), err =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
};

// Reads from the given json file and writes data to file system
// Checks for errors and after it parses the json file and adds the new note
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// Exports the readFromFile, writeToFile and readAndAppend to be available to the App
module.exports = { readFromFile, writeToFile, readAndAppend };
