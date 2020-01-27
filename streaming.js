const {Caller} = require('./caller.js');
const caller = new Caller(); 
const Pool = require('pg').Pool
const cc = require('cli-color')
const database = "sca"
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'sca',
  password: 'password',
  port: 5432,
})
console.log( "Using database: "  + cc.bgGreen(database))


const test1_getRows=()=> {

    const sql = 'select * from entries limit 10'

  pool.query(sql, (error, results) => {
    if (error) {
      console.log("Error " + error )
    } else {
        console.log(results.rows)
        caller.emit(sql)
    }
  })
}
test1_getRows()