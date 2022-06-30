const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// const User = require('./model/user');
const routes = require("./router");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.use(cors({
    origin: '*'
}));

module.exports = app;