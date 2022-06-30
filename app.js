const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const routes = require("./router");

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));
app.use(
    fileUpload({
        createParentPath: true
    })
);
app.use(routes);

module.exports = app;