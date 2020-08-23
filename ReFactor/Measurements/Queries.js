const contestMeasurements = (contest_id, cb) => {
    pool.query('SELECT * FROM measurements WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getMeasurementInfo = (contest_id, user_id, cb) => {
    pool.query('SELECT CAST(date_created AS DATE), CAST (measurement AS DOUBLE PRECISION) FROM measurements  WHERE contest_id = $1 AND user_id = $2 ORDER BY date_created ASC', [contest_id, user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logMeasurement = (user_id, contest_id, measurement, cb) => {
    pool.query('INSERT INTO measurements (user_id, contest_id, measurement) VALUES ($1, $2, $3) RETURNING id', [user_id, contest_id, measurement], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const adminMeasurementProgress = (user_id, cb) => {
    pool.query('SELECT CAST(measurement AS DOUBLE PRECISION), date_created FROM measurements WHERE user_id = $1 ORDER BY date_created DESC LIMIT 2', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}