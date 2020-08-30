
///////GET /api/currentstats/userId/:user_id
// const contestUserStats = (request, response) => {
//     const  user_id  = request.query.user_id
//     db.contestUserStats(user_id, function(results) {
//         if (results) {
//             /*console.log(results)*/
//             response.status(200).json(results.rows)
//         }else {
//             response.send('That user has no current stats')
//         }
//     })
// }
// app.get('/api/contestInfo/currentStats', routes.contestUserStats) -----------NOT USED ----------

//////////GET /api/currentstats/contestId/:contest_id
// const sidebarStats = (request, response) => {
//     const { contest_id } = request.query
//     db.sidebarStats(contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/sidebarStats', routes.sidebarStats) ------ FIXED

///////////GET /api/currentstats/contestUserId/weightPageStats // query with contest_id and user_id
// const weightPageStats = (request, response) => {
//     const { contest_id, user_id } = request.query
//     db.weightPageStats(contest_id, user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/weightPageStats', routes.weightPageStats)-------- FIXED

////////GET api/contestUserId/displayname // query with user_name and contest_id
// const groupWeightPageStats = (request, response) => {
//     const { contest_id, user_id } = request.query
//     db.groupWeightPageStats(contest_id, user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/groupWeightPageStats', routes.groupWeightPageStats) ------- FIXED

///////////POST /api/currentstats
// const addUserToCurrentStats = (request, response) => {
//     const { user_id, current_weight, goal_weight, display_name } = request.body
//     db.addUserToCurrentStats(user_id, current_weight, goal_weight, display_name, function(results){
//         if (results) {
//             response.status(201).send(`User added to currentStats`)
//         }else {
//             response.send('User Could not be added')
//         }
//     })
// }
// app.post('/api/addToCurrentStats', routes.addUserToCurrentStats) --------FIXED--- ALTERED NEW SERVER CODE

PATCH api/contestUserId // query with contest_id and user_id
// const updateCurrentWeight = (request, response) => {
//     const { user_id, contest_id, weight} = request.body
//     db.updateCurrentWeight(user_id, contest_id, weight, function(results){
//         if (results) {
//             response.status(201).send(`Weigh-in added to current stats table`)
//         }else {
//             response.send('Weigh-in could not be added')
//         }
//     })
// }
// app.put('/api/currentStats/weight', routes.updateCurrentWeight)

PATCH api/currentstats/userId/:user_id
// const addContestIdToCurrentStats = (request, response) => {
//     const { contest_id, user_id } = request.body
//     db.addContestIdToCurrentStats(contest_id, user_id, function(results){
//         if (results) {
//             response.status(201).send(`Weigh-in added to current stats table`)
//         }else {
//             response.send('Weigh-in could not be added')
//         }
//     })
// }
// app.put('/api/contestInfo/addContestId', routes.addContestIdToCurrentStats)