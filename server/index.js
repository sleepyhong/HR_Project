require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session) 
const cors = require('cors')

const loginRouter = require('./routes/loginRoutes')
// const db = require('./config/connection')

const MAX_AGE = 1000
const app = express()
const port = process.env.PORT || 5001

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// This is where your API is making its initial connection to the database
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {useNewUrlParser: true})

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.DATABASE_CONNECTION_STRING,
    collection: 'mySessions',
})

app.use(
    session({
        secret: 'a1s2d3f4g5h6',
        name: 'session-id', // cookies name to be put in "key" field in postman
        store: mongoDBstore,
        cookie: {
        maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
        sameSite: false,
        secure: false, // to turn on just in production
        },
        resave: true,
        saveUninitialized: false,
    })
)

app.use(cors(corsOptions))
app.use(express.json())

// ROUTERS
app.use('/api', loginRouter)

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app