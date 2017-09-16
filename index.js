var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

var Schema = mongoose.Schema();

// data bases
mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://localhost/mentor');
// ####

var db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

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


// Routes

// index routes
app.get("/", function (req, res) {
    res.render('signin', {
        cls: cls
    });
});



app.use(bodyParser.json());
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

app.listen(3000);
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
        console.log(user.name);
});

// cls.save( function(err,cls){
//     if(err)
//         console.log(failed);
//     else
//         console.log(course.name);
// });