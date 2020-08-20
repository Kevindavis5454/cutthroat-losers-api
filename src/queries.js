const Pool = require('pg').Pool
require('dotenv').config();
const bcrypt = require('bcrypt')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

});

const userAuth = (username, password, cb) => {
    pool.query('SELECT password, user_id FROM users WHERE username = $1', [username], (error, results) => {
        console.log(results.rows[0].password)
        if (error) {
            throw error
        }
        cb(results)
    })
}
const contestAuth = (request, response) => {
    const { contest_id } = request.body
    pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id], (error, results) => {
        console.log(results)
        if (error) {
            throw error
        }
        else {
            response.cookie('contest_id', results[0].id, {
                httpOnly: false,
                maxAge: 65000,
                signed: false,
                sameSite: 'none',
                secure: false,
            });
            console.log(response.cookie)
            response.send(``)
        }
    })
}


/*USERS TABLE*/

const getUsers = (cb) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getUserById = (request, response) => {
    const user_id = ParseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1 ORDER BY user_id ASC', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserByUsername = (username, cb) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (results) => {
        cb(results)
    })
}

const createUser= (display_name, username, password, cb) => {
    pool.query('INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING user_id', [display_name, username, password], (error, results) => {
        if (error) {
            console.log(error.code, "createUser Error")
            cb(error)
        }
        cb(results)
    })
}

const updateUser = (request, response) => {
    const user_id = parseInt(request.params.id)
    const { display_name, username, password } = request.body

    pool.query(
        'UPDATE users SET display_name =  $1, username = $2, password = $3, WHERE user_id = $4', [display_name, username, password, user_id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with USER ID: ${user_id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const user_id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with USER ID: ${user_id}`)
    })
}

/*CONTESTS TABLE*/

const getContests = (request, response) => {
    pool.query('SELECT * FROM contests ORDER BY contest_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getContestById = (request, response) => {
    const contest_id = parseInt(request.params.id)

    pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createContest = (request, response) => {
    const { date_start, date_end, contest_name, weighin_day, date_created} = request.body
        pool.query('INSERT INTO contests (date_start, date_end, contest_name, weighin_day, date_created) VALUES ($1, $2, $3, $4, $5) RETURNING contest_id', [date_start, date_end, contest_name, weighin_day, date_created], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Contest added with CONTEST ID: ${results.rows[0].contest_id}`)

        })
}

/*CONTEST TO USER*/

const getContestToUser = (cb) => {
    pool.query('SELECT * FROM contest_to_user ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}
const getContestsToUserById = (request, response) => {
    const user_id = parseInt(request.params.id)

    pool.query('SELECT * FROM contest_to_user WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getContestId = (contest_name, cb ) => {
    pool.query('SELECT * FROM contests WHERE contest_name = $1', [contest_name], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

// CONTEST INFO QUERIES

const contestMeasurements = (contest_id, cb) => {
    pool.query('SELECT * FROM measurements WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestWeighins = (contest_id, user_id, cb) => {
    pool.query('SELECT CAST(date_created AS DATE), CAST (weight AS DOUBLE PRECISION) FROM weighin WHERE contest_id = $1 AND user_id = $2 ORDER BY date_created ASC', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestPoints = (contest_id, cb) => {
    pool.query('SELECT * FROM points WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestSabotages = (contest_id, cb) => {
    pool.query('SELECT * FROM sabotage WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUsers = (contest_id, cb) => {
    pool.query('SELECT * FROM contest_to_user WHERE contest_id = $1 ORDER BY user_id ASC', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUsersInfo = (user_id, cb) => {
    pool.query('SELECT * FROM users  WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUserStats = (user_id, cb) => {
    pool.query('SELECT * FROM current_stats  WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const sidebarStats = (contest_id, cb) => {
    pool.query('SELECT * FROM current_stats  WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

// Points table

const pointsValue = (user_id, cb) => {
    pool.query('SELECT * FROM points WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const bingoPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'bingo' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const weightPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'weight' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const stomachPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'stomach' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const workoutPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'workout' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

// ----

const weightPageStats = (contest_id, user_id, cb) => {
    pool.query('SELECT current_weight, goal_weight, display_name FROM current_stats  WHERE contest_id = $1 AND user_id = $2', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUsersIds = (contest_id, cb) => {
    pool.query('SELECT user_id FROM contest_to_user WHERE contest_id = $1 ORDER BY user_id ASC', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const groupWeightPageStats = (contest_id, user_id, cb) => {
    pool.query('SELECT display_name FROM current_stats  WHERE contest_id = $1 AND user_id = $2', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUserWorkouts = (contest_id, user_id, category, cb) => {
    pool.query('SELECT date_created, category FROM workout_tracking  WHERE contest_id = $1 AND user_id = $2 AND category = $3 ORDER BY date_created ASC', [contest_id, user_id, category], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const weightProgress = (user_id, cb) => {
    pool.query('SELECT weight FROM weighin WHERE user_id = $1 ORDER BY date_created ASC LIMIT 1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const groupContestUserWorkouts = (contest_id, user_id, cb) => {
    pool.query('SELECT date_created FROM workout_tracking  WHERE contest_id = $1 AND user_id = $2 ORDER BY date_created ASC', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getMeasurementInfo = (contest_id, user_id, cb) => {
    pool.query('SELECT CAST(date_created AS DATE), CAST (measurement AS DOUBLE PRECISION) FROM measurements  WHERE contest_id = $1 AND user_id = $2 ORDER BY date_created ASC', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getUserPoints = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedStomach = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='stomach' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedWeight = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='weight' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedWorkout = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='workout' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedBingo = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='bingo' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsSpentBlock = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='block' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsSpentSabotage = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='sabotage' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logWorkout = (user_id, contest_id, category, cb) => {
    pool.query('INSERT INTO workout_tracking (user_id, contest_id, category) VALUES ($1, $2, $3) RETURNING id', [user_id, contest_id, category], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logWeight = (user_id, contest_id, weight, cb) => {
    pool.query('INSERT INTO weighin (user_id, contest_id, weight) VALUES ($1, $2, $3) RETURNING id', [user_id, contest_id, weight], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logMeasurement = (user_id, contest_id, measurement, cb) => {
    pool.query('INSERT INTO measurements (user_id, contest_id, measurement) VALUES ($1, $2, $3) RETURNING id', [user_id, contest_id, measurement], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logPointsWorkout = (user_id, contest_id, category, points, win_id , cb) => {
    pool.query('INSERT INTO points (user_id, contest_id, category, points, win_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user_id, contest_id, category, points, win_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const adminWeightProgress = (user_id, cb) => {
    pool.query('SELECT CAST(weight AS DOUBLE PRECISION), date_created FROM weighin WHERE user_id = $1 ORDER BY date_created DESC LIMIT 2', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const adminMeasurementProgress = (user_id, cb) => {
    pool.query('SELECT CAST(measurement AS DOUBLE PRECISION), date_created FROM measurements WHERE user_id = $1 ORDER BY date_created DESC LIMIT 2', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logPoints = (user_id, contest_id, category, points, win_id , cb) => {
    pool.query('INSERT INTO points (user_id, contest_id, category, points, win_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user_id, contest_id, category, points, win_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const adminGetAllUsers = (cb) => {
    pool.query('SELECT user_id, username, display_name FROM users', (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const addUserToContest = (contest_id, user_id, cb) => {
    pool.query('INSERT INTO contest_to_user (contest_id, user_id) VALUES ($1, $2) RETURNING id', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getNewContest = (contest_name, cb) => {
    pool.query('SELECT contest_id FROM contests WHERE contest_name = $1', [contest_name], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const addUserToCurrentStats= (user_id, current_weight, goal_weight, display_name, cb) => {
    pool.query('INSERT INTO current_stats (user_id, current_weight, goal_weight, display_name ) VALUES ($1, $2, $3, $4)', [user_id, current_weight, goal_weight, display_name], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const userIdByUsername = (username, cb) => {
    pool.query('SELECT user_id FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const updateCurrentWeight = (user_id, contest_id, weight, cb) => {
    pool.query('UPDATE current_stats SET current_weight = $1 WHERE user_id = $2 AND contest_id = $3', [weight, user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    userAuth,
    contestAuth,
    getContestToUser,
    getContests,
    createContest,
    getContestsToUserById,
    getContestById,
    getContestId,
    contestMeasurements,
    contestWeighins,
    contestPoints,
    contestSabotages,
    contestUsers,
    contestUsersInfo,
    contestUserStats,
    sidebarStats,
    pointsValue,
    weightPageStats,
    contestUsersIds,
    groupWeightPageStats,
    bingoPointsValue,
    contestUserWorkouts,
    weightProgress,
    groupContestUserWorkouts,
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


}

