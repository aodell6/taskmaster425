from sys import argv as args
from JSPrint import JSPrint as JSP
from Connection import Connection

args = args[1:]

connection = Connection.connection

try:
    com = connection.cursor()

    com.execute("CREATE DATABASE IF NOT EXISTS defaultdb;")

    com.execute("USE defaultdb;")

    com.execute("""CREATE TABLE IF NOT EXISTS  `LoginDatabase` (
	`UserID` VARCHAR(32) NOT NULL,
	`Password` VARCHAR(127) NOT NULL,
	PRIMARY KEY (`UserID`));""")

    com.execute("SELECT * FROM LoginDatabase WHERE UserID='"+args[0]+"';")

    JSP.outputKnown("Login", com.fetchall()[0]["Password"] == args[1])


except Exception as e:
    JSP.outputKnown("error",e)

finally:
    JSP.outputKnown("close", connection.close())