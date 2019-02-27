
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


dateTime_sense = time.strftime('%Y-%m-%d %H:%M:%S') 
temperature = 42
pressure = 89

data = {"Temperature": temperature,"Pressure": pressure, 'DateTime' : dateTime_sense}
    
ok = client.publish("elogistic/environment", str(data))
print(data)

