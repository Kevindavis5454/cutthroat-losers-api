GET api/contesttouser
// const getContestToUser = (cb) => {
//     pool.query('SELECT * FROM contest_to_user ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/contesttouser/contestId/:contest_id
// const contestUsers = (contest_id, cb) => {
//     pool.query('SELECT * FROM contest_to_user WHERE contest_id = $1 ORDER BY user_id ASC', [contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
GET api/contesttouser/getOnlyUserId // query with contest_id
// const contestUsersIds = (contest_id, cb) => {
//     pool.query('SELECT user_id FROM contest_to_user WHERE contest_id = $1 ORDER BY user_id ASC', [contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }
POST api/contesttouser
// const addUserToContest = (contest_id, user_id, cb) => {
//     pool.query('INSERT INTO contest_to_user (contest_id, user_id) VALUES ($1, $2) RETURNING id', [contest_id, user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }