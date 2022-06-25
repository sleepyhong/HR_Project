const express = require('express');
const routes = require("./router");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(routes);
app.use(cors({
    origin: '*'
}));

module.exports = app;