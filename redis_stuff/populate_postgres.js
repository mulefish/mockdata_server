const {Caller} = require('../caller.js');
const caller = new Caller(); 
const Pool = require('pg').Pool
const cc = require('cli-color')
const { CreateMockData } = require("./mock-data");
const mock = new CreateMockData()
const database = "sca"
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'sca',
  password: 'password',
  port: 5432,
})
console.log( "Using database: "  + cc.bgGreen(database))

// /////////////////////// NO-SQL //////////////////////////////////////////
const insertJsonObject = (loop, size, ts) => {

//    sql = `INSERT INTO entries(data) VALUES('${JSON.stringify(mock.getMock())}')`;
    let sql = 'INSERT INTO entries(data) VALUES'
    
    for ( let i = 0; i < size; i++) {
      sql += `('${JSON.stringify(mock.getMock())}')`
      if ( i < size - 1 ) {
        sql += ','
      }
    }



    pool.query(sql, (error, results) => {
    if (error) {
      console.log("Error " + error )
    } else {
      const ts2 = new Date().getTime() - ts
      caller.emit("Loop " + loop + " for " + ( loop * size ) + " took " + ts2 + " ms")      
    }
  })
}



const selectStuff = () => {

  pool.query('SELECT * FROM entries', (error, results) => {
    if (error) {
      console.log("Error " + error )
    } else {
      console.log( results.rows)
      pool.end()
    }
  })
}

// selectStuff()
//insertJsonObject()


function main() { 

  let limit =  1000
  let size = 1000
  let ts = new Date().getTime()
  for ( let i = 0; i < limit; i++ ) { 

    insertJsonObject( i, size, ts  )
  }

}
main()