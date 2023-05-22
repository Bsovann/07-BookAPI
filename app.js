const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 
const mongoose = require("mongoose"); 

const app = express();

app.set("view engine", 'ejs'); 
app.use(bodyParser.urlencoded({extended : true})); 
app.use(express.static("public")); 
/*
    RESTFUL BOOKAPI

    1. GET (Retrive) - All books and Single based on ID. 
    2. POST (Create) - Add to Book Collection. 
    3. PUT (Replace) - Repace a single book based on ID. 
    4. PATCH (Modify) - Modify a single book based on ID.
    5. DELETE (Delete) - Delete a single book based on ID or an entire collection.

*/

// Connect DB using Mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Library');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/Library');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
    id : String, 
    title : String, 
    author : String, 
    description : String 
}); 

// Schema
const Book = mongoose.model("Book", bookSchema); 

// GET
app.get("/books", async function(req, res){
   res.send(await Book.find({}));
});



app.listen(3000, function(){
    console.log("Server started on port 3000");
})