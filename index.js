require('dotenv').config();

const app = require("./app");
const port = process.env.PORT || 3001;

require('./db');

app.listen(port, function() {
    console.log(`Server is up and running on port ${port}.`);
});
