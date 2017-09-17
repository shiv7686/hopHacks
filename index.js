var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

var mongoose = require("mongoose"),
path = require("path"),
bodyParser = require('body-parser'),
db = require('mongodb').db,
gulp = require("./gulpfile.js");

var rooms = [];
var maxPerson = 2;
for (var i = 0; i < 50; i++) {
  rooms.push({ id: i, numPeople: 0 });
}

app.use(express.static("public"));

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/chat", function(req, res) {
//   res.sendFile(__dirname + "/design.html");
// });

// data bases
var promise = mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
});
app.set("view engine", "ejs");

//app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

var Schema = mongoose.Schema();

// models and Schema
var user = new mongoose.Schema({
    name: String,
    image: String,
    age: Number,
    password: String,
    mentor: Boolean,
    review: String
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

app.get("/", function (req, res) {
  res.render('index', {
      cls: cls
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/login/new", function (req, res) {
  res.render("dashboard", {tim});
});

// Gets data and returns it to the database
app.post("/login", function (req, res, next) {

  let name = req.body.email;
  let password = req.body.password;
  var test = new user({
      name: name,
      password: password,
      img : "/img/base.jpg"
  });

  tim = test;

  user.create(test, function (err, newlycreated) {
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

app.get("/login/:id", function (req, res,next) {
  user.findById(req.params.id, function (err, foundUser) {
    if (err)
    console.log(err);
    else
      res.end();
  });
});

app.get("/profile", function (req, res) {
  res.render('profile');
});

app.get("/users", function (req, res) 
{
  res.render('users');
});


app.get("/connect", function (req, res) {
  res.render('meeting');
});

io.on("connection", function(socket) {
  // Handles chat messages to rooms
  socket.on("chat message", function(msg) {
    console.log(msg);
    socket.broadcast.to(socket.room).emit("chat message", msg);
  });

  // Adds user to room
  socket.on("adduser", function(name) {
    console.log("adding " + name);
    socket.name = name;

    var room = findRoom();

    if (room === null) {
      console.log("ROOMS ARE FULL!!");
    }

    socket.room = room.id;
    socket.join(room.id);
    socket.emit("room", room.id);
//    console.log(rooms);
  });

  socket.on("disconnect", function() {
    socket.leave(socket.room);
    if (rooms[socket.room]) rooms[socket.room].numPeople--;
//    console.log(rooms);
  });
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});

function printRooms() {
  for (var i = 0; i < 50; i++) {
    console.log(rooms[i]);
  }
}
function findRoom() {
  for (var i = 0; i < 50; i++) {
    if (rooms[i].numPeople < maxPerson) {
      rooms[i].numPeople++;
      return rooms[i];
    }
  }
}


