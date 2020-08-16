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


app.post('/api/login', routes.userAuth)
app.get('/api/users', routes.getUsers)
app.get('/api/users/:id', db.getUserById)
app.post('/api/signup', routes.createUser)
app.put('/api/users/:id', db.updateUser)
app.delete('/api/users/:id', db.deleteUser)
app.get('/api/getNewContest', routes.getNewContest)
app.post('/api/addToCurrentStats', routes.addUserToCurrentStats)
app.get('/api/userIdByUsername', routes.userIdByUsername)


app.get('/api/contest_to_user', routes.getContestToUser)
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
app.get('/api/contestInfo/contestUserWorkouts', routes.contestUserWorkouts)
app.get('/api/contestInfo/groupContestUserWorkouts', routes.groupContestUserWorkouts)
app.get('/api/contestInfo/weightProgress', routes.weightProgress)
app.get('/api/contestInfo/measurementInfo', routes.getMeasurementInfo)
app.get('/api/contestInfo/getUserPoints', routes.getUserPoints)
app.get('/api/contestInfo/getPointsGainedStomach', routes.getPointsGainedStomach)
app.get('/api/contestInfo/getPointsGainedWeight', routes.getPointsGainedWeight)
app.get('/api/contestInfo/getPointsGainedWorkout', routes.getPointsGainedWorkout)
app.get('/api/contestInfo/getPointsGainedBingo', routes.getPointsGainedBingo)
app.get('/api/contestInfo/getPointsSpentBlock', routes.getPointsSpentBlock)
app.get('/api/contestInfo/getPointsSpentSabotage', routes.getPointsSpentSabotage)


app.get('/api/points', routes.pointsValue)
app.get('/api/points/bingo', routes.bingoPointsValue)
app.get('/api/points/weight', routes.weightPointsValue)
app.get('/api/points/stomach', routes.stomachPointsValue)
app.get('/api/points/workout', routes.workoutPointsValue)

app.post('/api/contestInfo/logWorkout', routes.logWorkout)
app.post('/api/contestInfo/logWeight', routes.logWeight)
app.post('/api/contestInfo/logMeasurement', routes.logMeasurement)
app.post('/api/contestInfo/logPointsWorkout', routes.logPointsWorkout)
app.post('/api/contestInfo/logPoints', routes.logPoints)

app.get('/api/contestInfo/adminWeight', routes.adminWeightProgress)
app.get('/api/contestInfo/adminMeasurement', routes.adminMeasurementProgress)
app.get('/api/admin/getAllUsers', routes.adminGetAllUsers)
app.post('/api/admin/addUserToContest', routes.addUserToContest)





app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || res.statusCode || 500)
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err: {}
    })
})

module.exports = app