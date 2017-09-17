var express = require('express');
var mongoose = require('mongoose');
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

module.exports = user();