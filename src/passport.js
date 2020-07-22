const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./queries');
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy((email, password, cb) => {
    db.query('SELECT user_id, email, password FROM users WHERE email = $1', [email], (err, result) => {
        if (err) {
            return cb(err)
        }
        if (result.rows.length > 0) {
            const first = result.rows[0]
            bcrypt.compare(password, first.password, function(err, res) {
                if (res) {
                    cb(null, {user_id: first.user_id, email:first.email })
                } else {
                    cb(null, false)
                }
            })
        } else {
            cb(null, false)
        }
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.user_id)
})

passport.deserializeUser((user_id, cb) => {
    db.query('SELECT user_id, email, FROM users WHERE user_id = $1', [parseInt(user_id, 10)], (err, results) => {
        if (err) {
            return cb(err)
        }
        cb(null, results.rows[0])
    })
})