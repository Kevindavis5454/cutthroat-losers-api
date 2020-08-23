
const getContestToUser = (cb) => {
    pool.query('SELECT * FROM contest_to_user ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUsers = (contest_id, cb) => {
    pool.query('SELECT * FROM contest_to_user WHERE contest_id = $1 ORDER BY user_id ASC', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const contestUsersIds = (contest_id, cb) => {
    pool.query('SELECT user_id FROM contest_to_user WHERE contest_id = $1 ORDER BY user_id ASC', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const addUserToContest = (contest_id, user_id, cb) => {
    pool.query('INSERT INTO contest_to_user (contest_id, user_id) VALUES ($1, $2) RETURNING id', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}