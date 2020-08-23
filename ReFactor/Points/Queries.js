const contestPoints = (contest_id, cb) => {
    pool.query('SELECT * FROM points WHERE contest_id = $1', [contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const pointsValue = (user_id, cb) => {
    pool.query('SELECT * FROM points WHERE user_id = $1', [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const weightPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'weight' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const stomachPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'stomach' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const workoutPointsValue = (user_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category = 'workout' AND user_id = $1", [user_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getUserPoints = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedStomach = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='stomach' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedWeight = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='weight' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const getPointsGainedWorkout = (user_id, contest_id, cb) => {
    pool.query("SELECT SUM(points) FROM points WHERE category='workout' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logPointsWorkout = (user_id, contest_id, category, points, win_id , cb) => {
    pool.query('INSERT INTO points (user_id, contest_id, category, points, win_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user_id, contest_id, category, points, win_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}

const logPoints = (user_id, contest_id, category, points, win_id , cb) => {
    pool.query('INSERT INTO points (user_id, contest_id, category, points, win_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user_id, contest_id, category, points, win_id], (error, results) => {
        if (error) {
            throw error
        }
        cb(results)
    })
}