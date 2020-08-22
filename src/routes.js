const db = require('./queries');

function validUser(user) {
    const validEmail = typeof user.username == 'string' &&
        user.username.trim() != '';
    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.trim().length >= 6;
    return validEmail && validPassword;
}

const createUser = (request, response, next) => {
    const { display_name, username, password} = request.body
    if (validUser(request.body)) {
         db.createUser(display_name, username, password, function(results){
             try{
                //  if (results === "23505"){
                //      response.status(401).send("Email already in use")
                //  } else {
                    response.status(201).send(`User added with USER ID: ${results.rows[0].user_id}`)
                //  }
                
             }
             catch(err){
                response.status(401).send("Email already in use")
             }
         })      
     }

    // }else {
    //     next(new Error('Invalid Username or Password format'))
    // }

}

const userAuth = (request, response, next) => {
    const { username, password } = request.body
    if (validUser(request.body)) {
        db.getUserByUsername(username, function(results){
            if (results){
                db.userAuth(username, password, function(results){
                    if (results.rows[0].password == password) {
                        response.cookie('user_id', results.rows[0].user_id, {
                            httpOnly: false,
                            expires: new Date(Date.now() + 12 * 3600000),
                            signed: false,
                            sameSite: 'none',
                            secure: true
                        });
                        console.log(response.cookie)
                        response.send(``)
                    }
                })
            }else {
                next(new Error('Username does not exist'))
            }
        })

    }else {
        next(new Error('Invalid Login'))
    }
}

const getUsers = (request, response) => {
    db.getUsers(function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no measurements for that contest')
        }
    })
}

const getContestToUser = (request, response) => {
    db.getContestToUser(function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no measurements for that contest')
        }
    })
}



// CONTEST INFO GATHERING
const getContestId = (request, response) => {
    const { contest_name } = request.body
    db.getContestId(contest_name, function(results) {
            console.log('yay we got data!')
            response.status(200).json(results.rows)
    })
}



const contestMeasurements = (request, response) => {
    const { contest_id } = request.query
    db.contestMeasurements(contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no measurements for that contest')
        }
    })
}

const contestWeighins = (request, response) => {
    const { contest_id, user_id } = request.query
    db.contestWeighins(contest_id, user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no weighins for that contest')
        }
    })
}

const contestPoints = (request, response) => {
    const { contest_id } = request.query
    db.contestPoints(contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no points for that contest')
        }
    })
}

const contestSabotages = (request, response) => {
    const { contest_id } = request.query
    db.contestSabotages(contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no sabotages for that contest')
        }
    })
}

const contestUsers = (request, response) => {
    const { contest_id } = request.query
    db.contestUsers(contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no users for that contest')
        }
    })
}

const contestUsersInfo = (request, response) => {
    const { user_id } = request.query
    db.contestUsersInfo(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no users for that contest')
        }
    })
}

const contestUserCurrentWeight = (request, response) => {
    const { user_id, contest_id} = request.query
    db.contestUserCurrentWeight(user_id, contest_id, function(results) {
        if (results) {
            console.log(results)
            response.status(200).json(results.rows)
        }else {
            response.send('There was no weight for that contest')
        }
    })
}

const contestUserStats = (request, response) => {
    const  user_id  = request.query.user_id
    db.contestUserStats(user_id, function(results) {
        if (results) {
            /*console.log(results)*/
            response.status(200).json(results.rows)
        }else {
            response.send('That user has no current stats')
        }
    })
}

const sidebarStats = (request, response) => {
    const { contest_id } = request.query
    db.sidebarStats(contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that contest')
        }
    })
}

const pointsValue = (request, response) => {
    const { user_id } = request.query
    db.pointsValue(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const bingoPointsValue = (request, response) => {
    const { user_id } = request.query
    db.bingoPointsValue(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const weightPointsValue = (request, response) => {
    const { user_id } = request.query
    db.weightPointsValue(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const stomachPointsValue = (request, response) => {
    const { user_id } = request.query
    db.stomachPointsValue(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const workoutPointsValue = (request, response) => {
    const { user_id } = request.query
    db.workoutPointsValue(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const weightPageStats = (request, response) => {
    const { contest_id, user_id } = request.query
    db.weightPageStats(contest_id, user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that contest')
        }
    })
}

const contestUserIds = (request, response) => {
    const { contest_id } = request.query
    db.contestUsersIds(contest_id, function(results) {
        if (results) {
            console.log(results)
            response.status(200).json(results.rows)
        }else {
            response.send('There was no users for that contest')
        }
    })
}

const groupWeightPageStats = (request, response) => {
    const { contest_id, user_id } = request.query
    db.groupWeightPageStats(contest_id, user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that contest')
        }
    })
}

const contestUserWorkouts = (request, response) => {
    const { contest_id, user_id, category } = request.query
    db.contestUserWorkouts(contest_id, user_id, category, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that contest')
        }
    })
}

const weightProgress = (request, response) => {
    const { user_id } = request.query
    db.weightProgress(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const groupContestUserWorkouts = (request, response) => {
    const { contest_id, user_id } = request.query
    db.groupContestUserWorkouts(contest_id, user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that contest')
        }
    })
}

const getMeasurementInfo = (request, response) => {
    const { contest_id, user_id } = request.query
    db.getMeasurementInfo(contest_id, user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that contest')
        }
    })
}

const getUserPoints = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getUserPoints(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const getPointsGainedStomach = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getPointsGainedStomach(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const getPointsGainedWeight = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getPointsGainedWeight(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const getPointsGainedWorkout = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getPointsGainedWorkout(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const getPointsGainedBingo = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getPointsGainedBingo(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const getPointsSpentBlock = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getPointsSpentBlock(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const getPointsSpentSabotage = (request, response) => {
    const { user_id, contest_id } = request.query
    db.getPointsSpentSabotage(user_id, contest_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const logWorkout = (request, response) => {
    const { user_id, contest_id, category} = request.body
    db.logWorkout(user_id, contest_id, category, function(results){
        if (results) {
        response.status(201).send(`Workout added with WORKOUT ID: ${results.rows[0].id}`)
        }else {
            response.send('Workout could not be added')
        }
    })
}

const logWeight = (request, response) => {
    const { user_id, contest_id, weight} = request.body
    db.logWeight(user_id, contest_id, weight, function(results){
        if (results) {
            response.status(201).send(`Weigh-in added with WEIGH-IN ID: ${results.rows[0].id}`)
        }else {
            response.send('Workout could not be added')
        }
    })
}

const logMeasurement = (request, response) => {
    const { user_id, contest_id, measurement} = request.body
    db.logMeasurement(user_id, contest_id, measurement, function(results){
        if (results) {
            response.status(201).send(`Measurement added with Measurement ID: ${results.rows[0].id}`)
        }else {
            response.send('Measurement could not be added')
        }
    })
}

const logPointsWorkout = (request, response) => {
    const { user_id, contest_id, category, points, win_id} = request.body
    db.logPointsWorkout(user_id, contest_id, category, points, win_id, function(results){
        if (results) {
            response.status(201).send(`Points added with Point ID: ${results.rows[0].id}`)
        }else {
            response.send('Points could not be added')
        }
    })
}

const adminWeightProgress = (request, response) => {
    const { user_id } = request.query
    db.adminWeightProgress(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const adminMeasurementProgress = (request, response) => {
    const { user_id } = request.query
    db.adminMeasurementProgress(user_id, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const logPoints = (request, response) => {
    const { user_id, contest_id, category, points, win_id} = request.body
    db.logPoints(user_id, contest_id, category, points, win_id, function(results){
        if (results) {
            response.status(201).send(`Points added with Point ID: ${results.rows[0].id}`)
        }else {
            response.send('Points could not be added')
        }
    })
}

const adminGetAllUsers = (request, response) => {
    db.adminGetAllUsers(function(results) {
        if (results) {
            response.status(200).json(results.rows)
        } else {
            response.send('There are no users')
        }
    })
}

const addUserToContest = (request, response) => {
    const { contest_id, user_id } = request.body
    db.addUserToContest(contest_id, user_id, function(results){
        if (results) {
            response.status(201).send(`User added with USER ID: ${results.rows[0].id}`)
        }else {
            response.send('Points could not be added')
        }
    })
}

const getNewContest = (request, response) => {
    const { contest_name } = request.query
    db.getNewContest(contest_name, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}

const addUserToCurrentStats = (request, response) => {
    const { user_id, current_weight, goal_weight, display_name } = request.body
    db.addUserToCurrentStats(user_id, current_weight, goal_weight, display_name, function(results){
        if (results) {
            response.status(201).send(`User added to currentStats`)
        }else {
            response.send('User Could not be added')
        }
    })
}

const userIdByUsername = (request, response) => {
    const { username } = request.query
    db.userIdByUsername(username, function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no info for that user')
        }
    })
}
const updateCurrentWeight = (request, response) => {
    const { user_id, contest_id, weight} = request.body
    db.updateCurrentWeight(user_id, contest_id, weight, function(results){
        if (results) {
            response.status(201).send(`Weigh-in added to current stats table`)
        }else {
            response.send('Weigh-in could not be added')
        }
    })
}

const addContestIdToCurrentStats = (request, response) => {
    const { contest_id, user_id } = request.body
    db.addContestIdToCurrentStats(contest_id, user_id, function(results){
        if (results) {
            response.status(201).send(`Weigh-in added to current stats table`)
        }else {
            response.send('Weigh-in could not be added')
        }
    })
}

module.exports = {
    userAuth,
    getContestId,
    createUser,
    contestMeasurements,
    contestWeighins,
    contestPoints,
    contestSabotages,
    contestUsers,
    contestUsersInfo,
    contestUserCurrentWeight,
    contestUserStats,
    sidebarStats,
    pointsValue,
    weightPageStats,
    contestUserIds,
    groupWeightPageStats,
    bingoPointsValue,
    contestUserWorkouts,
    weightProgress,
    groupContestUserWorkouts,
    getUsers,
    getContestToUser,
    getMeasurementInfo,
    weightPointsValue,
    stomachPointsValue,
    workoutPointsValue,
    getUserPoints,
    getPointsGainedStomach,
    getPointsGainedWeight,
    getPointsGainedWorkout,
    getPointsSpentBlock,
    getPointsSpentSabotage,
    getPointsGainedBingo,
    logWorkout,
    logWeight,
    logMeasurement,
    logPointsWorkout,
    adminWeightProgress,
    adminMeasurementProgress,
    logPoints,
    adminGetAllUsers,
    addUserToContest,
    getNewContest,
    addUserToCurrentStats,
    userIdByUsername,
    updateCurrentWeight,
    addContestIdToCurrentStats,
}