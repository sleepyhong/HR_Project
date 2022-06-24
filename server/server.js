const express = require('express');

const app = express();
const port = 3001;

app.get('/api', function(req, res) {
    res.send("123");
});

app.listen(port, () => console.log(123))