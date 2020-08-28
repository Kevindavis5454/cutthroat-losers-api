
GET /api/currentstats/userId/:user_id
// const contestUserStats = (user_id, cb) => {
//     pool.query('SELECT * FROM current_stats  WHERE user_id = $1', [user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET /api/currentstats/contestId/:contest_id
// const sidebarStats = (contest_id, cb) => {
//     pool.query('SELECT * FROM current_stats  WHERE contest_id = $1', [contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET /api/currentstats/userId/:user_id
// const weightPageStats = (contest_id, user_id, cb) => {
//     pool.query('SELECT current_weight, goal_weight, display_name FROM current_stats  WHERE contest_id = $1 AND user_id = $2', [contest_id, user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET /api/currentstats/userId/:user_id //gets more info than needed, filter on front end
// const groupWeightPageStats = (contest_id, user_id, cb) => {
//     pool.query('SELECT display_name FROM current_stats  WHERE contest_id = $1 AND user_id = $2', [contest_id, user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
POST /api/currentstats
// const addUserToCurrentStats= (user_id, current_weight, goal_weight, display_name, cb) => {
//     pool.query('INSERT INTO current_stats (user_id, current_weight, goal_weight, display_name ) VALUES ($1, $2, $3, $4)', [user_id, current_weight, goal_weight, display_name], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
PATCH api/currentstats/userId/:user_id // only needs user_id, assumes unique value
// const updateCurrentWeight = (user_id, contest_id, weight, cb) => {
//     pool.query('UPDATE current_stats SET current_weight = $1 WHERE user_id = $2 AND contest_id = $3', [weight, user_id, contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
PATCH api/currentstats/userId/:user_id
// const addContestIdToCurrentStats = (contest_id, user_id, cb) => {
//     pool.query('UPDATE current_stats SET contest_id = $1 WHERE user_id = $2', [contest_id, user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }