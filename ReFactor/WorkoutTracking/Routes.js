
GET api/workouts/getWorkoutData // query with user_id, contest_id, and category
// const contestUserWorkouts = (request, response) => {
//     const { contest_id, user_id, category } = request.query
//     db.contestUserWorkouts(contest_id, user_id, category, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/contestUserWorkouts', routes.contestUserWorkouts)

GET api/workouts/getDates
// const groupContestUserWorkouts = (request, response) => {
//     const { contest_id, user_id } = request.query
//     db.groupContestUserWorkouts(contest_id, user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/groupContestUserWorkouts', routes.groupContestUserWorkouts)

POST api/workouts/
// const logWorkout = (request, response) => {
//     const { user_id, contest_id, category} = request.body
//     db.logWorkout(user_id, contest_id, category, function(results){
//         if (results) {
//             response.status(201).send(`Workout added with WORKOUT ID: ${results.rows[0].id}`)
//         }else {
//             response.send('Workout could not be added')
//         }
//     })
// }
// app.post('/api/contestInfo/logWorkout', routes.logWorkout)