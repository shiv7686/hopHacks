var express = require("express"),
app         = express(),
mongoose    = require("mongoose"),
bodyparser  = require('body-parser');

app.set("view engine", "ejs");

var Schema = mongoose.Schema();

// data bases
mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/mentor');
// ####

// models and Schema

var user = new mongoose.Schema({
    name : String,
    age : Number
    }
);

var course = new mongoose.Schema(
    {
        name: String,
        number: Number
    }
);

var user = mongoose.model("User",user);
var course = mongoose.model("course",course);
// #####

// Routes
app.get("/", function(req,res){
    res.render('signin', {cls:cls});
});

app.get("/coursesearch", function(req,res)
{
    res.send(user.name + " search for a course");
});

app.get("/courseresults", function(req,res){
    mentor.find(mentor);
    res.send(mentor);
});

app.get("*",function(req,res){
    res.send("SOMETHING WENT WRONG");
});

app.listen(3000);
// #####

var tim = new user({
    name: "George",
    age : 11
});

var cls = new course({
    name: "History",
    number : 101
});


tim.save( function(err,user){
    if(err)
        console.log(failed);
    else
        console.log(user.name);
});

cls.save( function(err,cls){
    if(err)
        console.log(failed);
    else
        console.log(course.name);
});