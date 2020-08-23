const userAuth = (username, password, cb) => {
    pool.query('SELECT password, user_id FROM users WHERE username = $1', [username], (error, results) => {
        //console.log(results.rows[0].password)
        if (error) {
            throw error
        }
        cb(results)
    })
}

const checkUserByUsername = (username, cb) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
        if (error) {
            console.log(`Error: Code ${error.code}`)
            cb(error.code)
        }
        cb(results)
    })
}

const createUser= (display_name, username, password, cb) => {
    pool.query('INSERT INTO users (display_name, username, password) VALUES ($1, $2, $3) RETURNING user_id', [display_name, username, password], (error, results) => {
        if (error) {
            console.log(`Error: Code ${error.code}`)
            cb(error.code)
        }
        cb(results)
    })
}

const getUsers = (cb) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
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

const adminGetAllUsers = (cb) => {
    pool.query('SELECT user_id, username, display_name FROM users', (error, results) => {
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

