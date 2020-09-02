// GET api/contesttouser/userId/:user_id
// const getContestsToUserById = (request, response) => {
//     const user_id = parseInt(request.params.id)

//     pool.query('SELECT * FROM contest_to_user WHERE user_id = $1', [user_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }
// ////ABOVE HAS NO QUERY ALL IN ONE
// app.get('/api/contest_to_user/:id', db.getContestsToUserById) ---------- NOT USED

// GET api/contesttouser //this error handling makes no sense
// const getContestToUser = (request, response) => {
//     db.getContestToUser(function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no measurements for that contest')
//         }
//     })
// }
// app.get('/api/contest_to_user', routes.getContestToUser) --------- NOT USED

// GET api/contesttouser/contestId/:contest_id
// const contestUsers = (request, response) => {
//     const { contest_id } = request.query
//     db.contestUsers(contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no users for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/contestUsers', routes.contestUsers) ------- NOT USED

// GET api/contesttouser/getOnlyUserId // query with contest_id
// const contestUserIds = (request, response) => {
//     const { contest_id } = request.query
//     db.contestUsersIds(contest_id, function(results) {
//         if (results) {
//             console.log(results)
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no users for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/contestUserIds', routes.contestUserIds) -------- FIXED

// POST api/contesttouser
// const addUserToContest = (request, response) => {
//     const { contest_id, user_id } = request.body
//     db.addUserToContest(contest_id, user_id, function(results){
//         if (results) {
//             response.status(201).send(`User added with USER ID: ${results.rows[0].id}`)
//         }else {
//             response.send('Points could not be added')
//         }
//     })
// }
// app.post('/api/admin/addUserToContest', routes.addUserToContest) --------- FIXED