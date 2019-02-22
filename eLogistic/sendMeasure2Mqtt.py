from sense_hat import SenseHat
import requests
from random import randint
import paho.mqtt.client as mqtt
import uuid, os, sys, time, datetime

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

client = mqtt.Client()
client.on_connect = on_connect
client.connect("broker.hivemq.com", 1883, 60)
client.loop_start()


sense = SenseHat()

def get_mac():
  mac_num = hex(uuid.getnode()).replace('0x', '').upper()
  mac = '-'.join(mac_num[i: i + 2] for i in range(0, 11, 2))
  return mac

MacAddress = get_mac()

while True:
    time_sense = time.strftime('%H:%M:%S')
    date_sense = time.strftime('%d/%m/%Y')
    dateTime_sense = time.strftime('%Y-%m-%d %I:%M:%S %p') 
    humidity = round((sense.get_humidity()*64)/100,1)
    temperature = round(sense.get_temperature(),1)
    pressure = round(sense.get_pressure(),1)

    data = {"mac-id": MacAddress, "Date": date_sense,"Time": time_sense,
            "Temperature": temperature, "Humidity": humidity,
            "Pressure": pressure, 'DateTime' : dateTime_sense}
    
    temp_string = "{:.1f}".format(temperature)
    sense.show_message(temp_string, text_colour=[255, 0, 0])

    ok = client.publish("elogistic/environment", str(data))


    print("-")
    print(data)

    time.sleep(1)
    
