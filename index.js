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
var mentor = new mongoose.Schema({
    name : String,
    age : Number
});

var user = new mongoose.Schema({
    name : String,
    age : Number
    }
);

var user = mongoose.model("User",user);
var mentor = mongoose.model("mentor",mentor);
// #####

// Routes
app.get("/", function(req,res){
    res.render('signin');
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

var ham = new mentor({
    name : "Ham",
    age : 524
});

tim.save( function(err,user){
    if(err)
        console.log(failed);
    else
        console.log(user.name);
        console.log(mentor.name);
});
