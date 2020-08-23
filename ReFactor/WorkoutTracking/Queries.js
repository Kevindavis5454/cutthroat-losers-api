const contestUserWorkouts = (contest_id, user_id, category, cb) => {
    pool.query('SELECT date_created, category FROM workout_tracking  WHERE contest_id = $1 AND user_id = $2 AND category = $3 ORDER BY date_created ASC', [contest_id, user_id, category], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const groupContestUserWorkouts = (contest_id, user_id, cb) => {
    pool.query('SELECT date_created FROM workout_tracking  WHERE contest_id = $1 AND user_id = $2 ORDER BY date_created ASC', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logWorkout = (user_id, contest_id, category, cb) => {
    pool.query('INSERT INTO workout_tracking (user_id, contest_id, category) VALUES ($1, $2, $3) RETURNING id', [user_id, contest_id, category], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}