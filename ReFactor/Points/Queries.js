
GET api/points/contestId/:contest_id
// const contestPoints = (contest_id, cb) => {
//     pool.query('SELECT * FROM points WHERE contest_id = $1', [contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/points/userId/:user_id
// const pointsValue = (user_id, cb) => {
//     pool.query('SELECT * FROM points WHERE user_id = $1', [user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
CHANGE TO: GET api/points/userWeightPoints // query with user_id and contest_id
// const weightPointsValue = (user_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE category = 'weight' AND user_id = $1", [user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
CHANGE TO: GET api/points/userStomachPoints // query with user_id and contest_id
// const stomachPointsValue = (user_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE category = 'stomach' AND user_id = $1", [user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
CHANGE TO: GET api/points/userWorkoutPoints // query with user_id and contest_id
// const workoutPointsValue = (user_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE category = 'workout' AND user_id = $1", [user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/points/totalUserPoints // query with user_id and contest_id
// const getUserPoints = (user_id, contest_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/points/userStomachPoints // query with user_id and contest_id
// const getPointsGainedStomach = (user_id, contest_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE category='stomach' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/points/userWeightPoints // query with user_id and contest_id
// const getPointsGainedWeight = (user_id, contest_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE category='weight' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/points/userWorkoutPoints // query with user_id and contest_id
// const getPointsGainedWorkout = (user_id, contest_id, cb) => {
//     pool.query("SELECT SUM(points) FROM points WHERE category='workout' AND user_id = $1 AND contest_id = $2", [user_id, contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
POST api/points/
// const logPointsWorkout = (user_id, contest_id, category, points, win_id , cb) => {
//     pool.query('INSERT INTO points (user_id, contest_id, category, points, win_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user_id, contest_id, category, points, win_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
POST api/points/
// const logPoints = (user_id, contest_id, category, points, win_id , cb) => {
//     pool.query('INSERT INTO points (user_id, contest_id, category, points, win_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [user_id, contest_id, category, points, win_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }