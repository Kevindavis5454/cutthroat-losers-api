require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const db = require('./queries');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const routes = require('./routes')



const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({extended: false}))
app.use(cookieParser("tinybluedog"))
// app.use(cors())
const whitelist = ['https://cutthroat-losers-app.herokuapp.com', 'http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
app.use(cors(corsOptions))


// app.use('/auth', auth)
app.post('/api/login', routes.userAuth)
app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.post('/api/signup', routes.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)

app.get('/api/bingo_item', db.getBingoItems)

app.get('/api/contest_to_user', db.getContestToUser)
app.get('/api/contest_to_user/:id', db.getContestsToUserById)

app.post('/api/contests/auth', db.contestAuth)
app.get('/api/contests', db.getContests)
app.get('/api/contests/:id', db.getContestById)
app.post('/api/contests', db.createContest)

// Collect Selected Contest Info
app.post('/api/contests/getContestId', routes.getContestId)
app.get('/api/contestInfo/measurements', routes.contestMeasurements)
app.get('/api/contestInfo/userWeights', routes.contestWeighins)
app.get('/api/contestInfo/points', routes.contestPoints)
app.get('/api/contestInfo/sabotages', routes.contestSabotages)
app.get('/api/contestInfo/contestUsers', routes.contestUsers)
app.get('/api/contestInfo/contestUsersInfo', routes.contestUsersInfo)
app.get('/api/contestInfo/currentStats', routes.contestUserStats)
app.get('/api/contestInfo/sidebarStats', routes.sidebarStats)
app.get('/api/contestInfo/weightPageStats', routes.weightPageStats)
app.get('/api/contestInfo/contestUserIds', routes.contestUserIds)
app.get('/api/contestInfo/groupWeightPageStats', routes.groupWeightPageStats)

app.get('/api/points', routes.pointsValue)
app.get('/api/points/bingo', routes.bingoPointsValue)



app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || res.statusCode || 500)
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err: {}
    })
})

module.exports = app