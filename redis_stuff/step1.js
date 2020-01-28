const redis = require("redis"); 
const client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error!  " + err);
    console.log("Make sure redis is running! /Users/paul.montgomery/Downloads/redis-6.0-rc1/src/redis-server")
});
 

client.hset("person", "id", "1"); 
client.hset("person", "Fname", "paul"); 
client.hset("person", "State", "Oregon"); 
client.hset("person", "Color", "green"); 
client.HGETALL("person", function(err, x) {
    console.log ( x )
})

function cleanup() {
    console.log("Now I am done ")
    client.quit()
}
// clean up!
client.flushall('ASYNC', cleanup);