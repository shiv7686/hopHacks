var
    gulp        = require("./gulpfile.js"),
    express     = require("express"),
    mongoose    = require("mongoose"),
    path        = require("path"),
    bodyParser  = require('body-parser');

//var routes = require("./routes/index");
//var users   = require("./routes/users");
var app = express();

app.set("view engine", "ejs");

//app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

var Schema = mongoose.Schema();

// models and Schema
var user = new mongoose.Schema({
    name: String,
    age: Number,
    password: String,
    mentor : Boolean,
    review : String
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

// data bases
var promise = mongoose.connect('mongodb://localhost/test', {
    useMongoClient : true,
});

/// ######################
app.get("/", function (req, res) {
    res.render('index', {
      cls: cls
    });
    console.log("Test");
});


app.get("/login", function(req,res)
{
    res.render("login");
});

// Gets data and returns it to the database
app.post("/login", function (req, res, next) {

    let name = req.body.email;
    let password = req.body.password;
    var test = new user({
        name : name,
        password : password
    });
    
    tim = test;
    
    user.create(test,function (err, newlycreated) {
        if (err)
            console.log(err);
        else
            res.redirect("login");
    });
    // db.user.insert({name: tim.name, password:tim.password});
    console.log("Pushed to db, Welcome " + test.name);
    //res.send("Hello" + tim.name);
    //res.send(200);
});

app.get("/login/new", function(req,res)
{
    res.render("dashboard",{tim});
    //next();
});

app.get("/login/:id", function(req,res)
{
    user.findById(req.params.id,function(err, foundUser)
    {
        if(err)
            console.log(err);
        else
            res.render("show", {user:foundUser});
    });
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

//app.use('users',routes);
app.listen(3000);

// #####
module.exports = app;