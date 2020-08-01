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

const contestInfo = (request, response) => {
    const { contest_id } = request.body
    db.contestInfo(contest_id, function(results) {
        console.log(results)
        response.status(200).json(results.rows)
    })
}

const getContestId = (request, response) => {
    const { contest_name } = request.body
    db.getContestId(contest_name, function(results) {
            console.log('yay we got data!')
            response.status(200).json(results.rows)
    })
}

module.exports = {
    userAuth,
    getContestId,
    contestInfo,
    createUser,
}