var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://broker.hivemq.com')








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
  //client.end()
})

