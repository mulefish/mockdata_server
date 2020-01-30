const express = require('express')
const app = express()
const port = 3030
const cc = require('cli-color')
const Pool = require('pg').Pool
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')
const bodyParser = require('body-parser')

app.use(express.static('public')) // Try about.html
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'sca',
    password: 'password',
    port: 5432,
})

const testFunc1 = (request, response) => {
    console.log("testFunc1 plain vanilla http server")
    const responseObj = {
        'hello': 'world'
    }
    response.status(200).json(responseObj)
}

const testFunc2 = (request, response) => {
    console.log("testFunc2 simple db query")
    pool.query('SELECT * FROM entries limit 1', (error, results) => {
        if (error) {
            console.log("Error " + error)
            response.status(500).send(`getJsonObjects fail! `)
        } else {
            response.status(200).json(results.rows)
        }
    })
}


const testFunc3 = (request, response) => {
    console.log("testFunc3 simple streams to stdout")
    pool.connect(function(err, client, done) {
        if (err) {
            throw err;
        }
        const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000])
        const stream = client.query(query)
        stream.on('end', done)
        stream.pipe(JSONStream.stringify()).pipe(process.stdout)
    })
}

const testFunc4 = (request, response) => {
  console.log("testFunc4 simple streams to http")
  pool.connect(function(err, client, done) {
      if (err) {
          throw err;
      }
      const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000])
      const stream = client.query(query)
      stream.on('end', done)
      stream.on('data', (row) => {
        response.write(JSON.stringify(row));
        response.write(',');
      });      
  })
}

const testFunc5 = (request, response) => {
  console.log("testFunc5 simple streams to http with simple query")
  pool.connect(function(err, client, done) {
      if (err) {
          throw err;
      }
      const query = new QueryStream('SELECT * FROM entries limit 10')
      const stream = client.query(query)
      stream.on('end', done)
      stream.on('data', (row) => {
        response.write(JSON.stringify(row));
        response.write(',');
//        stream.pipe(JSONStream.stringify()).pipe(process.stdout)

      });      
  })
}

const testFunc6 = (request, response) => {
    console.log("testFunc6 simple streams to http with simple query FOO ")
    pool.connect(function(err, client, done) {
        if (err) {
            throw err;
        }
        const query = new QueryStream('SELECT ship_to from foo')
        const stream = client.query(query)
        stream.on('end', done)
        stream.on('data', (row) => {
          response.write(JSON.stringify(row));
          response.write(',');
  //        stream.pipe(JSONStream.stringify()).pipe(process.stdout)
  
        });      
    })
  }
    


app.get('/test', testFunc1)
app.get('/test2', testFunc2)
app.get('/test3', testFunc3)
app.get('/test4', testFunc4)
app.get('/test5', testFunc5)
app.get('/test6', testFunc6)
app.listen(port, () => {
    const coloredPort = cc.bgGreen(port)
    console.log(`App running on port: ${coloredPort}`)
})