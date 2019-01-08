var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')




////////////////////////////////////////////////////
///////////////////// MYSQL ////////////////////////
////////////////////////////////////////////////////
var mysql = require('mysql'); //https://www.npmjs.com/package/mysql
//Create Connection
var connection = mysql.createConnection({
	host: "35.233.35.231",
	user: "dany",
	password: "dany",
	database: "guestbook"
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("Database Connected!");
});


//insert a row into the tbl_messages table
//this is only a simple example
//  Database: mysql; table=entries; 3 columns (Guestname, Content, Entry ID (auto))
function insert_message(message_str) {
  var message_arr = message_str.split(","); //convert to array	

	var guestName= message_arr[0];
  var content = message_arr[1];
	var sql = "INSERT INTO ?? (??,??) VALUES (?,?)";
	var params = ['entries', 'Guestname', 'Content', guestName, content];
	sql = mysql.format(sql, params);	
	
	connection.query(sql, function (error, results) {
		if (error) throw error;
		console.log("Message added: " + message_str);
	}); 
}; 



////////////////////////////////////////////////////
///////////////////// MQTT  ////////////////////////
////////////////////////////////////////////////////
client.on('connect', function () {
  client.subscribe('ima5', function (err) {
    if (!err) {
      client.publish('ima5', 'Hello, Test')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  var msg = message.toString() + '';
  console.log(msg)
  if (msg.startsWith('Hello')) {
    console.log('DUMMY')
  } else {
    insert_message(msg);
  }
  
  //client.end()
})

