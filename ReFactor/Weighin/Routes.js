
// GET api/weighins/getContestWeighins
// const contestWeighins = (request, response) => {
//     const { contest_id, user_id } = request.query
//     db.contestWeighins(contest_id, user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no weighins for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/userWeights', routes.contestWeighins)---------- FIXED

// GET api/weighins/getUserWeights
// const weightProgress = (request, response) => {
//     const { user_id } = request.query
//     db.weightProgress(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/weightProgress', routes.weightProgress)-------- FIXED

// POST api/weighins/
// const logWeight = (request, response) => {
//     const { user_id, contest_id, weight} = request.body
//     db.logWeight(user_id, contest_id, weight, function(results){
//         if (results) {
//             response.status(201).send(`Weigh-in added with WEIGH-IN ID: ${results.rows[0].id}`)
//         }else {
//             response.send('Workout could not be added')
//         }
//     })
// }
// app.post('/api/contestInfo/logWeight', routes.logWeight)--------- FIXED

// GET api/weighins/getAdminUserWeights
// const adminWeightProgress = (request, response) => {
//     const { user_id } = request.query
//     db.adminWeightProgress(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/adminWeight', routes.adminWeightProgress)---------- FIXED