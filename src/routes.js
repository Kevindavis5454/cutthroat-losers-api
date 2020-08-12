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
        db.getUserByUsername(username, function(results) {})
            .then(user => {
                if (!user) {
                    //this is a unique email
                    db.createUser(display_name, username, password, function(results){
                        response.status(201).send(`User added with USER ID: ${results.rows[0].user_id}`)
                    })
                } else {
                    //email in use!
                    next(new Error('Email in use'))
                }
            })
    }else {
        next(new Error('Invalid Username or Password format'))
    }

}

const userAuth = (request, response, next) => {
    const { username, password } = request.body
    if (validUser(request.body)) {
        db.getUserByUsername(username, function(results){})
            .then(user => {
                if (user){
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
}