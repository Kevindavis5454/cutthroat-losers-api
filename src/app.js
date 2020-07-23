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
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(bodyParser.urlencoded ({extended: true,}))
app.use(bodyParser.json())
app.use(session({secret: 'tinybluedog'}))
app.use(express.static("public"));
app.use(cookieParser())

app.get('/', (request, response) => {
        response.json({ info: 'Node.js, Express, and Postgres API'})
    }
)
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
        return pool.query('SELECT user_id, username, password FROM users WHERE username = $1 AND password = $2', [username, password] )
            .then ((result) => { return done(null, result);
            })
            .catch((err) => {
                return done(null, false, {message:'Wrong Email or Password'});
            })
            }));



passport.serializeUser((user, done) => {
    done(null, user.user_id)
})

passport.deserializeUser((user_id, done) => {
    pool.query('SELECT user_id, username, FROM users WHERE user_id = $1', [user_id] )
        .then((user) => {
            done(null, user)
        })
        .catch((err) => {
            done(new Error(`User with id ${user_id} does not exist`));
        })
})


app.post('/api/login', passport.authenticate('local', { successRedirect: '/personal/home', failureRedirect: '/', failureFlash: true }))


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