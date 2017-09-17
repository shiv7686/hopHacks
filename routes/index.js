var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
//var user = require("/users.js");
var app = express();

var Schema = mongoose.Schema();

// models and Schema
var user = new mongoose.Schema({
    name: String,
    age: Number,
    password: String
});

var course = new mongoose.Schema({
    name: String,
    number: Number
});

var user = mongoose.model("User", user);
var course = mongoose.model("course", course);
// #####
var tim = new user();

var cls = new course({
    name: "History",
    number: 101
});

tim.save(function (err, user) {
    if (err)
        console.log(failed);
    else
        console.log(tim.name);
});
// data bases

mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/mentor');


/// ######################
app.get("/", function (req, res) {
  res.render('signin', {
      cls: cls
  });
  console.log("Test");
});

app.post("/", function (req, res) {
    
    var test = new user({
        name : req.body.email,
        password : req.body.password
    });

    tim = test;
   // db.user.insert({name: tim.name, password:tim.password});
    console.log("Pushed to db, Welcome " + test.name);
    //res.send(200);
});

app.get("/dashboard", function(req,res)
{
    res.send("Hello"+ this.user.name);
});
// Course search route
app.get("/coursesearch", function (req, res) {
    res.send(user.name + " search for a course");
});

app.get("/courseresults", function (req, res) {
    mentor.find(mentor);
    res.send(mentor);
});

app.get("*", function (req, res) {
    res.send("SOMETHING WENT WRONG");
});

/// ###################################

module.exports = user;
module.exports = router;