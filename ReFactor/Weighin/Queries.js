const contestWeighins = (contest_id, user_id, cb) => {
    pool.query('SELECT CAST(date_created AS DATE), CAST (weight AS DOUBLE PRECISION) FROM weighin WHERE contest_id = $1 AND user_id = $2 ORDER BY date_created ASC', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const weightProgress = (user_id, cb) => {
    pool.query('SELECT weight FROM weighin WHERE user_id = $1 ORDER BY date_created ASC LIMIT 1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logWeight = (user_id, contest_id, weight, cb) => {
    pool.query('INSERT INTO weighin (user_id, contest_id, weight) VALUES ($1, $2, $3) RETURNING id', [user_id, contest_id, weight], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const adminWeightProgress = (user_id, cb) => {
    pool.query('SELECT CAST(weight AS DOUBLE PRECISION), date_created FROM weighin WHERE user_id = $1 ORDER BY date_created DESC LIMIT 2', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}