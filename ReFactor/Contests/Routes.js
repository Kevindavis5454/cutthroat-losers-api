
//eliminated because we don't need a contest auth
// const contestAuth = (request, response) => {
//     const { contest_id } = request.body
//     pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id], (error, results) => {
//         console.log(results)
//         if (error) {
//             throw error
//         }
//         else {
//             response.cookie('contest_id', results[0].id, {
//                 httpOnly: false,
//                 maxAge: 65000,
//                 signed: false,
//                 sameSite: 'none',
//                 secure: false,
//             });
//             console.log(response.cookie)
//             response.send(``)
//         }
//     })
// }

// //// ABOVE DID NOT HAVE A QUERY ALL in ONE
// app.post('/api/contests/auth', db.contestAuth)

///////GET /api/contests
// const getContests = (request, response) => {
//     pool.query('SELECT * FROM contests ORDER BY contest_id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }
// ///ABOVE HAS NO QUERY ALL IN  ONE
// app.get('/api/contests', db.getContests)  ----- No CHANGE

///////GET /api/contests/:contest_id
// const getContestById = (request, response) => {
//     const contest_id = parseInt(request.params.id)

//     pool.query('SELECT * FROM contests WHERE contest_id = $1', [contest_id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }
// ///ABOVE HAS NO QUERY ALL IN  ONE
// app.get('/api/contests/:id', db.getContestById) --- NO CHANGE

//////POST api/contests
// const createContest = (request, response) => {
//     const { date_start, date_end, contest_name, weighin_day, date_created} = request.body
//     pool.query('INSERT INTO contests (date_start, date_end, contest_name, weighin_day, date_created) VALUES ($1, $2, $3, $4, $5) RETURNING contest_id', [date_start, date_end, contest_name, weighin_day, date_created], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`Contest added with CONTEST ID: ${results.rows[0].contest_id}`)

//     })
// }
// ///ABOVE HAS NO QUERY ALL IN  ONE
// app.post('/api/contests', db.createContest) ----- CHANGE

/////GET /api/contests/contestName/:contest_name
// const getContestId = (request, response) => {
//     const { contest_name } = request.body
//     db.getContestId(contest_name, function(results) {
//         console.log('yay we got data!')
//         response.status(200).json(results.rows)
//     })
// }
// app.post('/api/contests/getContestId', routes.getContestId) ---------- FIXED


///////GET api/contests/contestByName/getId // query with contest_name
// const getNewContest = (request, response) => {
//     const { contest_name } = request.query
//     db.getNewContest(contest_name, function(results) {
//         if (results) {
//             response.status(200).json(results.rows)
//         }else {
//             response.send('There was no info for that user')
//         }
//     })
// }
// app.get('/api/getNewContest', routes.getNewContest) ------------FIXED