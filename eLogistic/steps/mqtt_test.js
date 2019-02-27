var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://85.119.83.194')


client.on('connect', function () {
    client.subscribe('myTopic', function (err) {
        if (!err) {
            client.publish('myTopic', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})
