const Pool = require('pg').Pool
require('dotenv').config();
const bcrypt = require('bcrypt')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

});

const userAuth = (request, response) => {
    const { username, password } = request.body
    pool.query('SELECT password, user_id FROM users WHERE username = $1', [username], (error, results) => {
        console.log(results.rows[0].password)
        if (error) {
            throw error
        }
        if (results.rows[0].password == password) {
            response.cookie('user_id', results.rows[0].user_id, {
                httpOnly: false,
                maxAge: 65000,
                signed: false,
                sameSite: 'none',
                secure: false,
            });
            console.log(response.cookie)
            response.send(`${results.rows[0].user_id}`)
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
    const user_id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { display_name, username, password} = request.body
        pool.query('INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING user_id', [display_name, username, password], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with USER ID: ${results.rows[0].user_id}`)
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
    pool.query('SELECT * FROM contest_to-user ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getContestsById = (request, response) => {
    const user_id = parseInt(request.params.id)

    pool.query('SELECT * FROM contests_to_user WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    userAuth,
    getBingoItems,
    getContestToUser,
    getContests,
    createContest,
    getContestsById
}

