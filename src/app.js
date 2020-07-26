require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const db = require('./queries');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const auth = require('../auth/index')
const cookieParser = require('cookie-parser')
const authMiddleware = require('../auth/middleware')


const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
/*app.use(cors())*/
app.use(cors({
    origin: 'https://cutthroat-losers.vercel.app',
    credentials: true,
}))


app.use('/auth', auth)

app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.post('/api/users', db.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)



app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || res.statusCode || 500)
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err: {}
    })
})

module.exports = app