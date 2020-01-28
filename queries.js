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

// // /////////////////////// NO-SQL //////////////////////////////////////////
// const insertJsonObject = (request, response) => {
//     caller.showStack()
//     pool.query('INSERT INTO validatedTable (data) VALUES($1)', [request.body], (error, results) => {
//     if (error) {
//       console.log("Error " + error )
//       response.status(500).send(`Validation constraint fail ${error}`)
//     } else {
//       response.status(201).send(`insert into validatedtable ${JSON.stringify(request.body)}`)
//     }
//   })
// }


const getPaginatedEntries = (request, response) => {
  caller.showStack()

  const t1 = request.body.t1 
  const t2 = new Date().getTime() 
  const t3 = new Date().getTime() 
  let ary = ["A","B","C"]
  let responseObj = {
    t1,
    t2,
    t3,
    results:ary
  }
  caller.showObj(responseObj)
  response.status(200).json( responseObj )

}


const getEntriesCount = (request, response) => {
  caller.showStack()

  pool.query('SELECT count(*) FROM entries', (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getJsonObjects fail! `)

    } else {
      console.log("It is OK ")
      response.status(200).json( results.rows)
    }
  })
}

const countEntries = (request, response) => {
  // caller.showStack()
  // const ary = ["hello there" , "one","two","helloworld"]
  // response.status(200).json(ary)
  caller.showStack()
  pool.query('SELECT count(*) FROM entries', (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getJsonObjects fail! `)
    } else {
      response.status(200).json( results.rows)
    }
  })
}

const getSomeEntries = (request, response ) => {
  caller.showStack()

  const start = request.query.start;
  const stop = request.query.stop;
  const t1 = request.query.t1; 

  pool.query('SELECT * FROM entries limit 3', (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getJsonObjects fail! `)
    } else {

      const t2 = new Date().getTime()
      const meta = {
        start:start,
        stop:stop,
        t1:t1,
        t2:t2
      }
      results.rows.push(meta)
      response.status(200).json( results.rows)
    }
  })
}


const getEntries = (request, response) => {
  // caller.showStack()
  // const ary = ["hello there" , "one","two","helloworld"]
  // response.status(200).json(ary)
  caller.showStack()
  pool.query('SELECT * FROM entries limit 10', (error, results) => {
    if (error) {
      console.log("Error " + error )
      response.status(500).send(`getJsonObjects fail! `)
    } else {
      response.status(200).json( results.rows)
    }
  })
}




// const getJsonObjectsById = (request, response) => {
//   caller.showStack()
//   const id = parseInt(request.params.id)
//   let sql = "SELECT * FROM validatedTable WHERE (data #>> '{id}')::numeric = $1"
//   const d1 = new Date().getTime() 

//   pool.query(sql, [id], (error, results) => {

//     if (error) {
//       console.log("Error " + error )
//       response.status(500).send(`getUserById fail ${error}`)
//     } else {
//       const d2 = new Date().getTime() 
//       console.log("MS elapsed " + ( d2 - d1 ))
//       response.status(200).json(results.rows)
//     }
//   })
// }



// // ////////////////////// END NO-SQL ///////////////////////////////////////////

// // /////////////////////// TRADITIONAL //////////////////////////////////////////


// const getUsers = (request, response) => {
//   caller.showStack()
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       console.log("Error " + error )
//       response.status(500).send(`getUsers fail ${error}`)
//     } else {
//       response.status(200).json(results.rows)
//     }
//   })
// }

// const getUserById = (request, response) => {
//   caller.showStack()
//   const id = parseInt(request.params.id)
//   const d1 = new Date().getTime() 
//   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       console.log("Error " + error )
//       response.status(500).send(`getUserById fail ${error}`)
//     } else {
//       const d2 = new Date().getTime() 
//       console.log("MS elapsed " + (d2 - d1))
//       response.status(200).json(results.rows)
//     }
//   })
// }

// const createUser = (request, response) => {
//   caller.showStack()
//   const { name, email } = request.body
//   console.log("name ", name , " email ", email )
//   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    
//     if (error) {
//       console.log("Error " + error )
//       response.status(500).send(`createUser fail ${error}`)
//     }
//     else {
//       response.status(200).json("User added")
//     }
//   })
// }

// const updateUser = (request, response) => {
//   caller.showStack()
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         console.log("Error " + error )
//         response.status(500).send(`updateUser fail ${error}`)
//       } else { 
//         response.status(200).send(`User modified with ID: ${id}`)
//       } 
//     }
//   )
// }

// const deleteUser = (request, response) => {
//   caller.showStack()
//   const id = parseInt(request.params.id)
//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       console.log("Error " + error )
//       response.status(500).send(`deleteUser fail ${error}`)
//     } else {
//     response.status(200).send(`User deleted with ID: ${id}`)
//     }
//   })
// }

// /////////////////////// END TRADITIONAL //////////////////////////////////////////


module.exports = {
  getEntries,
  getEntriesCount,
  getPaginatedEntries,
  countEntries,
  getSomeEntries

  // getUsers,
  // getUserById,
  // createUser,
  // updateUser,
  // deleteUser,
  // insertJsonObject,
  // getJsonObjects,
  // getJsonObjectsById
}
