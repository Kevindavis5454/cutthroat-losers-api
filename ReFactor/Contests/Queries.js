
GET /api/contests/contestName/:contest_name
// const getContestId = (contest_name, cb ) => {
//     pool.query('SELECT * FROM contests WHERE contest_name = $1', [contest_name], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }

GET api/contests/contestByName/getId // query with contest_name
// const getNewContest = (contest_name, cb) => {
//     pool.query('SELECT contest_id FROM contests WHERE contest_name = $1', [contest_name], (error, results) => {
//         if (error) {
//             throw error
//         }
//         cb(results)
//     })
// }