import uuid, os, sys, time, datetime;
import mysql.connector
from sense_hat import SenseHat

#sense
sense = SenseHat();

#Connection to MySQL
cnx = mysql.connector.connect(user='pi2', password='password',
                              host='rp-admin',
                              port='3306',
                              database='eLogistic')

while True:
    time_sense = time.strftime('%H:%M:%S')
    date_sense = time.strftime('%d/%m/%Y')
    dateTime_sense = time.strftime('%Y-%m-%d %H:%M:%S') 
    humidity = round((sense.get_humidity()*64)/100,1)
    temperature = round(sense.get_temperature(),1)
    pressure = round(sense.get_pressure(),1)
    
    data = {"Temperature": temperature, "Humidity": humidity,
            "Pressure": pressure, 'DateTime' : dateTime_sense}
    print("-")
    print(data)
    
    
    try:
        cursor = cnx.cursor();
        query = "INSERT INTO environment (tstamp,temperature,humidity,pressure) VALUES (%s,%s,%s,%s)";
        vals = (dateTime_sense,temperature,humidity,pressure);
        result = cursor.execute(query,vals)
        cnx.commit()
    except:
        print('!Could not insert a new record  to MySql\n\tError: {0}\n\t\t{1}\n\t\t{2}'.format(sys.exc_info()[0], sys.exc_info()[1], sys.exc_info()[2]));
    finally:
        if(cnx.is_connected()):
            cursor.close()

    time.sleep(1);