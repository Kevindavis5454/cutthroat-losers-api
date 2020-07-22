const db = require('./queries');
const bcrypt = require('bcrypt')
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(email, password, done) {
        db.query('SELECT user_id, email, password FROM users WHERE email = $1', [email], (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user_id, done) => {
    db.query('SELECT user_id, email, FROM users WHERE user_id = $1', [parseInt(user_id, 10)], (err, results) => {
        if (err) {
            return done(err)
        }
        done(null, results.rows[0])
    })
})