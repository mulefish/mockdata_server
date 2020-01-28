// const pg = require('pg')
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')
const Pool = require('pg').Pool
const database = "sca"
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'sca',
  password: 'password',
  port: 5432,
})


function self_test(){
pool.connect(function(err, client, done) {
//    client.query(/* etc, etc */)
//    done()
if (err) { 
    throw err;
}
    const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [10])
    const stream = client.query(query)
    stream.on('end', done)
    stream.pipe(JSONStream.stringify()).pipe(process.stdout)
    })
} 
// self_test()



function self_test2(){

    const qs = new QueryStream('SELECT * FROM entries limit 10');

    pool.connect(function(err, client, done) {
        if (err) { 
            throw err;
        }
        // const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [2])
        const query = new QueryStream('SELECT * entries limit 10')
        const stream = client.query(query)
        stream.on('end', done)
        stream.pipe(JSONStream.stringify()).pipe(process.stdout)
    })
} 
self_test2()  


/*
pg.connect((err, client, done) => {
    if (err) throw err;
    const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000])
    const stream = client.query(query)
    //release the client when the stream is finished
    stream.on('end', done)
    stream.pipe(JSONStream.stringify()).pipe(process.stdout)
  })
*/

/*
//pipe 1,000,000 rows to stdout without blowing up your memory usage
pg.connect((err, client, done) => {
  if (err) throw err;
  const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000000])
  const stream = client.query(query)
  //release the client when the stream is finished
  stream.on('end', done)
  stream.pipe(JSONStream.stringify()).pipe(process.stdout)
})
*/