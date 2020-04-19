var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();

var PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//GET `*` - Should return the `index.html` file
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// The application should have a `db.json` file on the backend that will be used to store 
var savedNotes= [];
function WriteNote(){
    fs.writeFile('./db/db.json',JSON.stringify(savedNotes),'utf8', function(err){
        if(err){
            return console.log(err)
        }
    });
}

// and retrieve notes using the `fs` module.
function getNotes() {
    fs.readFile("db/db.json", "utf8", function (err, data) {
        if (err) {
            return error(err)
        }else{ savedNotes.push(...JSON.parse(data));}
    });
}



// start server
app.listen(PORT, function () {
    console.log("localhost:" + PORT);
});