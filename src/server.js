const express = require('express')
const parser = require('body-parser')

const app = express()
const PORT = 8080 || process.env.PORT


app.use(parser.urlencoded({extended: false}))


app.get('/', (request, response) => {return response.send("Hello world!")})
app.listen(PORT, () => {console.log(`working on ${PORT}`)})


