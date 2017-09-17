var
    gulp        = require("./gulpfile.js"),
    express     = require("express"),
    mongoose    = require("mongoose"),
    path        = require("path"),
    bodyParser  = require('body-parser');

var routes = require("./routes/index");
//var users   = require("./routes/users");
var app = express();

app.set("view engine", "ejs");

app.use('/css', express.static(__dirname + '/css'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes
app.get("/",routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
//app.use('users',routes);
app.listen(3000);

// #####

module.exports = app;