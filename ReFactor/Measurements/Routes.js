///////////GET api/measurements/contestId/:contest_id
// const contestMeasurements = (request, response) => {
//     const { contest_id } = request.query
//     db.contestMeasurements(contest_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no measurements for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/measurements', routes.contestMeasurements)  ------- NOT USED------

/////////GET api/measurements/getMeasurementInfo //query with contest_id and user_id
// const getMeasurementInfo = (request, response) => {
//     const { contest_id, user_id } = request.query
//     db.getMeasurementInfo(contest_id, user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that contest')
//         }
//     })
// }
// app.get('/api/contestInfo/measurementInfo', routes.getMeasurementInfo) -------FIXED

//////////POST api/measurements
// const logMeasurement = (request, response) => {
//     const { user_id, contest_id, measurement} = request.body
//     db.logMeasurement(user_id, contest_id, measurement, function(results){
//         if (results) {
//             response.status(201).send(`Measurement added with Measurement ID: ${results.rows[0].id}`)
//         }else {
//             response.send('Measurement could not be added')
//         }
//     })
// }
// app.post('/api/contestInfo/logMeasurement', routes.logMeasurement)  ------ FIXED

//////////GET api/measurements/getAdminMeasurementProgress // query with user_id
// const adminMeasurementProgress = (request, response) => {
//     const { user_id } = request.query
//     db.adminMeasurementProgress(user_id, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/contestInfo/adminMeasurement', routes.adminMeasurementProgress) ------FIXED