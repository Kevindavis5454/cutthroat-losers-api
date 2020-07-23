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
app.use(session({secret: 'tinybluedog'}))
app.use(cookieParser())

app.get('/', (request, response) => {
        response.json({ info: 'Node.js, Express, and Postgres API'})
    }
)
app.post('/api/login', passport.authenticate('local', { successRedirect: '/personal/home', failureRedirect: '/', failureFlash: true }))
app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.post('/api/users', db.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

});


passport.use(new LocalStrategy(
    function(username, password, done) {
        pool.query('SELECT EXISTS( SELECT * FROM users WHERE username = $1, password = $2)', [username, password], (error, user)=> {
            if (error) {
                return done(error)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user_id, done) => {
    db.query('SELECT user_id, username, FROM users WHERE user_id = $1', [parseInt(user_id, 10)], (err, results) => {
        if (err) {
            return done(err)
        }
        done(null, results.rows[0])
    })
})

app.use(passport.initialize())
app.use(passport.session())


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