import uuid, os, sys, time, datetime;
import mysql.connector

#Connection to MySQL
cnx = mysql.connector.connect(user='pi2', password='password',
                              host='rp-admin',
                              port='3306',
                              database='eLogistic')
try:
    cursor = cnx.cursor();
    cursor.execute("show tables;");
    result = cursor.fetchall();
    print("%Successfully Connected to the database with these tables -- {0}".format(result));
except:
    cnx.rollback()
    print('!Could not connect to MySql\n\tError: {0}'.format(sys.exc_info()[0]));


try:
    cursor = cnx.cursor();
    query = "INSERT INTO environment (tstamp,pressure) VALUES (%s,%s)";
    vals = (time.strftime('%Y-%m-%d %H:%M:%S'),42,);
    result = cursor.execute(query,vals)
    cnx.commit()
except:
    print('!Could not insert a new record  to MySql\n\tError: {0}\n\t\t{1}\n\t\t{2}'.format(sys.exc_info()[0], sys.exc_info()[1], sys.exc_info()[2]));
finally:
    if(cnx.is_connected()):
        cursor.close()