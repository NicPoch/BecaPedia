var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var personasRouter=require('./routes/persona');
var aplicacionesRouter=require("./routes/aplicacion");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/personas',personasRouter);
app.use('/api/aplicaciones',aplicacionesRouter);


module.exports = app;
