const getUserById = (request, response) => {
    const user_id = ParseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE user_id = $1 ORDER BY user_id ASC', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//ABOVE HAS NO QUERY ALL IN ONE
app.get('/api/users/:id', db.getUserById)


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
//ABOVE HAS NO QUERY ALL IN ONE
app.put('/api/users/:id', db.updateUser)


const deleteUser = (request, response) => {
    const user_id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with USER ID: ${user_id}`)
    })
}
//ABOVE HAS NO QUERY ALL IN ONE
app.delete('/api/users/:id', db.deleteUser)


function validUser(user) {
    const validEmail = typeof user.username == 'string' &&
        user.username.trim() != '';
    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.trim().length >= 6;
    return validEmail && validPassword;
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
app.post('/api/login', routes.userAuth)


const checkUserByUsername = (request, response) => {
    const { username } = request.query
    db.checkUserByUsername(username, function(results) {
        console.log(results)
        if (results.rows.length !== 0) {
            response.status(401).json(results.rows)
        }else {
            response.status(200).json(results.rows)
        }
    })
}
app.get('/api/checkUserByUsername', routes.checkUserByUsername)


const createUser = (request, response) => {
    const { display_name, username, password} = request.body
    if (validUser(request.body)) {
        db.createUser(display_name, username, password, function(results){
            if (results) {
                response.status(200).send(`User added with USER ID: ${results.rows[0].user_id}`)
            }
        })
    }
}
app.post('/api/signup', routes.createUser)


const getUsers = (request, response) => {
    db.getUsers(function(results) {
        if (results) {
            response.status(200).json(results.rows)
        }else {
            response.send('There was no measurements for that contest')
        }
    })
}
app.get('/api/users', routes.getUsers)


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
app.get('/api/contestInfo/contestUsersInfo', routes.contestUsersInfo)


const adminGetAllUsers = (request, response) => {
    db.adminGetAllUsers(function(results) {
        if (results) {
            response.status(200).json(results.rows)
        } else {
            response.send('There are no users')
        }
    })
}
app.get('/api/admin/getAllUsers', routes.adminGetAllUsers)


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
app.get('/api/userIdByUsername', routes.userIdByUsername)