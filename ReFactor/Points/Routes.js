
// GET api/points/contestId/:contest_id
// const contestPoints = (request, response) => {
//     const { contest_id } = request.query
//     db.contestPoints(contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no points for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/points', routes.contestPoints) -------- NOT USED

// GET api/points/userId/:user_id
// const pointsValue = (request, response) => {
//     const { user_id } = request.query
//     db.pointsValue(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/points', routes.pointsValue) --------- NOT USED

// GET api/points/userWeightPoints // query with user_id and contest_id
// const weightPointsValue = (request, response) => {
//     const { user_id } = request.query
//     db.weightPointsValue(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/points/weight', routes.weightPointsValue) --------- NOT USED

// GET api/points/userStomachPoints // query with user_id and contest_id
// const stomachPointsValue = (request, response) => {
//     const { user_id } = request.query
//     db.stomachPointsValue(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/points/stomach', routes.stomachPointsValue) --------- NOT USED

// GET api/points/userWorkoutPoints // query with user_id and contest_id
// const workoutPointsValue = (request, response) => {
//     const { user_id } = request.query
//     db.workoutPointsValue(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/points/workout', routes.workoutPointsValue) ------- NOT USED

// GET api/points/totalUserPoints // query with user_id and contest_id
// const getUserPoints = (request, response) => {
//     const { user_id, contest_id } = request.query
//     db.getUserPoints(user_id, contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/getUserPoints', routes.getUserPoints) ----------- FIXED

// GET api/points/userStomachPoints // query with user_id and contest_id
// const getPointsGainedStomach = (request, response) => {
//     const { user_id, contest_id } = request.query
//     db.getPointsGainedStomach(user_id, contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/getPointsGainedStomach', routes.getPointsGainedStomach) -------- NOT USED

// GET api/points/userWeightPoints // query with user_id and contest_id
// const getPointsGainedWeight = (request, response) => {
//     const { user_id, contest_id } = request.query
//     db.getPointsGainedWeight(user_id, contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/getPointsGainedWeight', routes.getPointsGainedWeight) ------ NOT USED

// GET api/points/userWorkoutPoints // query with user_id and contest_id
// const getPointsGainedWorkout = (request, response) => {
//     const { user_id, contest_id } = request.query
//     db.getPointsGainedWorkout(user_id, contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/getPointsGainedWorkout', routes.getPointsGainedWorkout) --------- NOT USED

// POST api/points/
// const logPointsWorkout = (request, response) => {
//     const { user_id, contest_id, category, points, win_id} = request.body
//     db.logPointsWorkout(user_id, contest_id, category, points, win_id, function(results){
//         if (results) {
//             response.status(201).send(`Points added with Point ID: ${results.rows[0].id}`)
//         }else {
//             response.send('Points could not be added')
//         }
//     })
// }
// app.post('/api/contestInfo/logPointsWorkout', routes.logPointsWorkout) ----------- FIXED

// POST api/points/
// const logPoints = (request, response) => {
//     const { user_id, contest_id, category, points, win_id} = request.body
//     db.logPoints(user_id, contest_id, category, points, win_id, function(results){
//         if (results) {
//             response.status(201).send(`Points added with Point ID: ${results.rows[0].id}`)
//         }else {
//             response.send('Points could not be added')
//         }
//     })
// }
// app.post('/api/contestInfo/logPoints', routes.logPoints) -------- FIXED