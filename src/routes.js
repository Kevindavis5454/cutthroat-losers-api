const db = require('./queries');


const userAuth = (request, response) => {
    const { username, password } = request.body
            db.userAuth(username, password, function(results){
                if (results.rows[0].password == password) {
                    response.cookie('user_id', results.rows[0].user_id, {
                        httpOnly: false,
                        expires: new Date(Date.now() + 900000),
                        signed: false,
                        sameSite: 'none',
                        secure: true
                    });
                    console.log(response.cookie)
                    response.send(``)
                }
            })

}

module.exports = {
    userAuth
}