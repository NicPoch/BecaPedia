var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var universidadesRouter=require('./routes/universidad');
var becasRouter=require('./routes/beca');
var programasRouter=require('./routes/programa');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/universidades', universidadesRouter);
app.use('/api/becas', becasRouter);
app.use('/api/programas', programasRouter);

module.exports = app;
