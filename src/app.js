require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const db = require('./queries');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(flash())
app.use(bodyParser.urlencoded ({extended: true,}))
app.use(bodyParser.json())
app.use(session({secret: 'tinybluedog'}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (request, response) => {
        response.json({ info: 'Node.js, Express, and Postgres API'})
    }
)
app.post('/api/login', passport.authenticate('local', { successRedirect: '/personal/home', failureRedirect: '/' }))
app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.post('/api/users', db.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app