

(async function() {
    var pool = new pg.Pool({
        user: 'me',
        host: 'localhost',
        database: 'sca',
        password: 'password',
        port: 5432,
    });
  
    var client = await pool.connect();
  
    var app = express();
  
    app.get('/', function(req, res) {
      console.log(new Date(), 'Starting...');
  
      var start = now();
  
      var stream = client.query(new QueryStream('select * from entries limit 10'));
  
      stream.on('end', function() {
        var end = now();
  
        console.log(new Date(), 'Finished...', end - start);
  
        client.release();
      });
  
      stream.pipe(JSONStream.stringify()).pipe(res);
    });
  
    app.listen(5000, function() {
      console.log('Listening...');
    });
  })();