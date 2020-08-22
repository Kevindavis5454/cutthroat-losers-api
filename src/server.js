const app = require('./app')
const { PORT } = require('./config');


const server = app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

module.exports = server
