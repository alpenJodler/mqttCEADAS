var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json())



////////////////////////////////////////////////////
///////////////////// MYSQL ////////////////////////
////////////////////////////////////////////////////
var mysql = require('mysql'); //https://www.npmjs.com/package/mysql
//Create Connection
var connection = mysql.createConnection({
	host: "rp-admin",
	user: "pi2",
	password: "password",
	database: "eLogistic"
});
connection.connect(function(err) {
	if (err) throw err;
	console.log("Database Connected!");
});


//insert a row into the tbl_messages table
//this is only a simple example
//  Database: mysql; table=entries; 3 columns (Guestname, Content, Entry ID (auto))
function insert_message(message_str) {
  data_str = message_str.replace(new RegExp("'", 'g'), "\"");
  var data = JSON.parse(data_str);
  console.log(data.Time);
  console.log(data.Temperature);
  console.log(data.Pressure);
  console.log(data.Humidity);
  console.log(new Date(data.DateTime));
  
	var sql = "INSERT INTO ?? (??,??, ??, ??) VALUES (?,?,?, ?)";
	var params = ['environment', 'Temperature', 'Pressure',  'Tstamp', 'Humidity', data.Temperature, data.Pressure,  new Date(data.DateTime), data.Humidity];
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
  client.subscribe('elogistic/environment', function (err) {
    if (!err) {
      client.publish('elogistic/environment', 'Hello, Test')
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
    //parse the String into a json document
  
    insert_message(msg);
  }
  
  //client.end()
})

