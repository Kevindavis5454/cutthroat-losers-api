const Pool = require('pg').Pool
require('dotenv').config();

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
const contestAuth = (contest_id, cb) => {
    pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
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

const getUserById = (user_id, cb) => {
    pool.query('SELECT * FROM users WHERE user_id = $1 ORDER BY user_id ASC', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getUserByUsername = (username, cb) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const createUser= (display_name, username, password, cb) => {
    pool.query('INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING user_id', [display_name, username, password], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const updateUser = (user_id, display_name, username, password, cb) => {
    pool.query(
        'UPDATE users SET display_name =  $1, username = $2, password = $3, WHERE user_id = $4', [display_name, username, password, user_id], (error, results) => {
            if (error) {
                throw error
            }
            cb(results)
        }
    )
}

const deleteUser = (user_id, cb) => {
    pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

/*CONTESTS TABLE*/

const getContests = (cb) => {
    pool.query('SELECT * FROM contests ORDER BY contest_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}
const getContestById = (contest_id, cb) => {
    pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const createContest = (date_start, date_end, contest_name, weighin_day, date_created, cb) => {
        pool.query('INSERT INTO contests (date_start, date_end, contest_name, weighin_day, date_created) VALUES ($1, $2, $3, $4, $5) RETURNING contest_id', [date_start, date_end, contest_name, weighin_day, date_created], (error, results) => {
            if (error) {
                throw error
            }
            cb(results)
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
const getContestsToUserById = (user_id, cb) => {
    pool.query('SELECT * FROM contest_to_user WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
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


}

