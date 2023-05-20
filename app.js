const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 
const mongoose = require("mongoose"); 

const app = express();

app.set("view engine", 'ejs'); 

/*
    RESTFUL BOOKAPI

    1. GET (Retrive) - All books and Single based on ID. 
    2. POST (Create) - Add to Book Collection. 
    3. PUT (Replace) - Repace a single book based on ID. 
    4. PATCH (Modify) - Modify a single book based on ID.
    5. DELETE (Delete) - Delete a single book based on ID or an entire collection.

*/

app.get('/', function(req, res){
    res.send("Hello World! You're connected!!");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})