const Pool = require('pg').Pool
require('dotenv').config();
const bcrypt = require('bcrypt')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

});

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
    const saltRounds = 10;
    const { display_name, email, password} = request.body
    bcrypt.hash(password, saltRounds, function(err, hash) {
        pool.query('INSERT INTO users (display_name, email, password) VALUES ($1, $2, $3) RETURNING user_id', [display_name, email, hash], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with USER ID: ${results.rows[0].user_id}`)
        })
    })
}

const updateUser = (request, response) => {
    const user_id = parseInt(request.params.id)
    const { display_name, email, password } = request.body

    pool.query(
        'UPDATE users SET display_name =  $1, email = $2, password = $3, WHERE user_id = $4', [display_name, email, password, user_id], (error, results) => {
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


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}

