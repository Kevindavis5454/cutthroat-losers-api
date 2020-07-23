require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const db = require('./queries');
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const Pool = require('pg').Pool
const bcrypt = require('bcrypt')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.options('*', cors())
app.use(flash())
app.use(bodyParser.urlencoded ({extended: true,}))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SECRET,
}))
app.use(cookieParser())


passport.use(new LocalStrategy((username, password, cb) => {
    pool.query('SELECT user_id, username, password, type FROM users WHERE username=$1', [username], (err, result) => {
        if(err) {
            return cb(err)
        }

        if(result.rows.length > 0) {
            const first = result.rows[0]
            bcrypt.compare(password, first.password, function(err, res) {
                if(res) {
                    cb(null, { id: first.id, username: first.username, type: first.type })
                } else {
                    cb(null, false)
                }
            })
        } else {
            cb(null, false)
        }
    })
}))
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    pool.query('SELECT user_id, username, type FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
        if(err) {
            return cb(err)
        }

        cb(null, results.rows[0])
    })
})
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/login', passport.authenticate('local', { successRedirect: '/'}))
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