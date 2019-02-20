


////////////////////////////////////////////////////
///////////////////// FIREBASE ////////////////////////
////////////////////////////////////////////////////
var firebase = require('firebase');
firebase.initializeApp({
  "databaseURL": "https://project1-c62b2.firebaseio.com/"
});
var ref = firebase.database().ref("UWC1/");
var lastKey=null;


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


//retrieve all data
readDataFromFirebase(ref, null);

//Event: new child on firebase
ref.on("child_added", function(snapshot, prevChildKey) {
    lastKey=snapshot.key;
    
    //wait 10ms
    setTimeout(function() {
        readDataFromFirebase(ref, lastKey);
    }, 10);
});


function getMyDate(dateStr) {
  var myTime = dateStr.replace(new RegExp("\"", 'g'), "");
  //var d = Date.parse(myTime, "YYYY-MM-DDTHH:MM:ss");
  return new Date(myTime);
}


function readDataFromFirebase(firebase1, myKey) {
  firebase1.once('value') .then(function (snapshot) {      
        snapshot.forEach(function(data) {
            if (myKey==null || data.key==myKey) {
              processData(data);
            }
        });
  });
}

function processData(data) {
    console.log("The " + data.key + " is: ");
    console.log("  speed=" + data.val().speed);
    var d = getMyDate(data.val().tstamp);
    console.log("  tstamp=" + data.val().tstamp + "  --> " + d.toString());
    console.log("  val=" + data.val().val);
    console.log("  long=" + data.val().longitude);
    console.log("  lat=" + data.val().latitude);


    var sql = "INSERT INTO ?? (??, ??,??, ??, ??, ??) VALUES (?, ?,?,?,?, ?)";
    var params = ['movement', 'DATA_KEY', 'LONGITUDE', 'LATITUDE', 'TSTAMP', 'VALUE','SPEED', data.key, data.val().longitude, data.val().latitude, d, data.val().val, data.val.speed];
    sql = mysql.format(sql, params);	
    
    connection.query(sql, function (error, results) {
      if (error) {
        //do nothing
      } else {
        console.log("record added: " + data.key);
      }
    }); 
}






