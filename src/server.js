const express = require('express')
const parser = require('body-parser')
const routes = require('./routes/routes')

const app = express()
const PORT = 8080 || process.env.PORT


app.use(parser.urlencoded({extended: false}))

routes(app)
app.listen(PORT, () => {console.log(`working on ${PORT}`)})


