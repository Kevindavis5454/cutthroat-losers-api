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

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
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

/*BINGO TABLE*/

const getBingoItems = (request, response) => {
    pool.query('SELECT * FROM bingo_item ORDER BY item_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/*CONTEST TO USER*/

const getContestToUser = (request, response) => {
    pool.query('SELECT * FROM contest_to_user ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
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
    pool.query('SELECT contest_id FROM contests WHERE contest_name = $1', [contest_name], (error, results) => {
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

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    userAuth,
    contestAuth,
    getBingoItems,
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

}

