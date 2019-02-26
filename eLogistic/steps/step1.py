import time, datetime;
from sense_hat import SenseHat

#sense
sense = SenseHat();

dateTime_sense = time.strftime('%Y-%m-%d %H:%M:%S') 
temperature = round(sense.get_temperature(),1)
print(temperature)
#




