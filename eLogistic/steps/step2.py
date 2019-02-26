import uuid, os, sys, time, datetime;
import mysql.connector

#Connection to MySQL
cnx = mysql.connector.connect(user='pi2', password='password',
                              host='rp-admin',
                              port='3306',
                              database='eLogistic')


try:
    cursor = cnx.cursor();
    query = "INSERT INTO scratch (tval,val3) VALUES (%s,%s)";
    vals = (time.strftime('%Y-%m-%d %H:%M:%S'),42,);
    result = cursor.execute(query,vals)
    cnx.commit()
except:
    print('!Could not insert a new record  to MySql ..')
    if(cnx.is_connected()):
cursor.close()

