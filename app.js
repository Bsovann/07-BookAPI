// Initialize dependencies
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

    1. GET (Retrive) - All books or Single book based on ID. 
    2. POST (Create) - Add a book to Book Collection. 
    3. PUT (Replace) - Repace a single book based on ID. 
    4. PATCH (Modify) - Modify a single book based on ID.
    5. DELETE (Delete) - Delete a single book based on ID or an entire collection.

*/

// Connect MongoDB using Mongoose
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Library');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/Library');` if your database has auth enabled
}
// Define Book Schema
const bookSchema = new mongoose.Schema({
    id : String, 
    title : String, 
    author : String, 
    description : String 
}); 
// Create a collection if there is not exist in DB
const Book = mongoose.model("Book", bookSchema); 

////////////////////////// Multiple Books //////////////////////////////////
// GET, PUT, and DELETE - Multiple Books
app.route("/books")
// GET Request (Retrive all Documents)
.get(async function(req, res){
    res.send(await Book.find({}));
})
// POST Request (Add a document to a collection)
.post(async function(req, res){
    const newBook = new Book({
        id : req.body.id,
        title : req.body.title,
        author : req.body.author, 
        description : req.body.description
    });

    Book.insertMany([newBook]);
    res.send("Successfully added book/s to library collection.");
})
// Delete All Documents Request
.delete(async function(req, res){
    await Book.deleteMany({});
    res.send("Successfully deleted all books in a library collection.");
}); 
////////////////////////// Multiple Books //////////////////////////////////

////////////////////////// Single Books ///////////////////////////////////
// GET, PUT, PATCH, DELETE - Single Book
app.route("/books/:Bookid")
// GET Single Book 
.get(async function(req, res){
    res.send(await Book.findOne({id : req.params.Bookid}).exec());
})
// PUT Single book (Update atomically or replace)
.put(async function(req, res){
    const replacedInfo = {
        id : req.body.id,
        title : req.body.title,
        author : req.body.author, 
        description : req.body.description
    };
    await Book.findOneAndReplace({id : req.params.Bookid}, replacedInfo);
    res.send("Successfully replaced a book in a library collection.");
})
// Patch Single book (Update Non-atomically or modify)
.patch(async function(req, res){
    const updatedInfo = {
        id : req.body.id,
        title : req.body.title,
        author : req.body.author, 
        description : req.body.description
    };
    await Book.updateOne({id : req.params.Bookid}, updatedInfo);
    res.send("Successfully modified a book in a library collection.");
})

// Delete Single book based BookID 
.delete(async function(req, res){
    await Book.findOneAndDelete({id : req.params.Bookid});
    res.send("Successfully deleted a book in a library collection.");
});
////////////////////////// Single Books ///////////////////////////////////

app.listen(3000, function(){
    console.log("Server started on port 3000");
})
