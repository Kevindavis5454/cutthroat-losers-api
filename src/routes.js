const db = require('./queries');


const userAuth = (request, response) => {
    const { username, password } = request.body
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

}

const contestInfo = (request, response) => {
    const { contest_id } = request.body
    db.contestInfo(contest_id, function(results) {
        if (results) {
            console.log('Yay There is data!')
        }
        response.status(200).json(results.rows)
    })
}

const getContestId = (request, response) => {
    const { contest_name } = request.params.contestName
    db.getContestId(contest_name, function(results) {
        if (results) {
            response.cookie('contest_id', results.rows[0].contest_id, {
                httpOnly: false,
                expires: new Date(Date.now() + 12 * 3600000),
                signed: false,
                sameSite: 'none',
                secure: true
            })
            response.status(200).json(results.rows)

        }
    })
}

module.exports = {
    userAuth,
    getContestId,
    contestInfo,
}