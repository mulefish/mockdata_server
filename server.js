const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3030 
const cc = require('cli-color')

app.use(express.static('public')) // Try about.html

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


//app.get('/', (request, response) => {
//  response.json({ info: 'Node.js, Express, and Postgres API and NoSQL w/ Postgres' })
//})
// /////////////////////// TRADITIONAL //////////////////////////////////////////

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

// // /////////////////////// NO-SQL //////////////////////////////////////////
// app.post('/jsonObj', db.insertJsonObject)
// app.get('/jsonObj', db.getJsonObjects)
// app.get('/jsonObj/:id', db.getJsonObjectsById)
app.get('/getEntries', db.getEntries)
app.get('/getEntriesCount', db.getEntriesCount)
app.post('/getPaginatedEntries', db.getPaginatedEntries)
app.get('/countEntries', db.countEntries)
app.get('/getSomeEntries', db.getSomeEntries)
app.listen(port, () => {
  const coloredPort =  cc.bgGreen( port )
  console.log(`App running on port: ${coloredPort}`)
})
