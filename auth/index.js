const express =  require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../db/user')
const app = express()



//Route paths are prepended with /auth

function validUser(user) {
    const validUsername = typeof user.username == 'string' &&
                        user.username.trim() != '';
    const validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;

    return validUsername && validPassword;

}

app.post('/signup' , (req, res, next) => {
    if (validUser(req.body)) {
        User
            .getOneByUsername(req.body.username)
            .then(user => {
                console.log('user', user)
                // if user not found
                if(!user) {
                    //this is a unique email
                    //hash password
                    bcrypt.hash(req.body.password, 10)
                        .then((hash) => {
                            //Store hash in your password DB
                            const user = {
                               username: req.body.username,
                               password: hash,
                               display_name: req.body.display_name
                            };
                            //insert user into db
                            User
                            .create(user)
                                .then(id => {
                                    res.json ({
                                        message: 'User created!'
                                    })
                                    })
                    })

                    //redirect
                } else {
                    //email in use!
                    next(new Error('Email in use'))
                }
            })

    } else {
        next(new Error('Invalid user'))
    }
});


app.post('/login', (req, res, next) => {
    if(validUser(req.body)) {
        //check to see if in DB
        User
            .getOneByUsername(req.body.username)
            .then((user) => {
                console.log('user', user)
                if(user) {
                    //compare password with hashed password
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then((result) => {
                        //if the passwords matched
                            if(result) {
                                //setting the "set-cookie" header
                                const isSecure = req.app.get('env') != 'development'
                                res.cookie('user_id', user.id, {
                                    httpOnly: true,
                                    signed: true,
                                    secure: isSecure
                                });
                                res.json({
                                    result,
                                    message: 'Logged in!'
                                })
                            }else {
                                next(new Error('Invalid login'))
                            }
                    })
                }else {
                    next(new Error('Invalid login'))
                }
            })
    }else {
        next(new Error('Invalid login'))
    }
})

module.exports = router;