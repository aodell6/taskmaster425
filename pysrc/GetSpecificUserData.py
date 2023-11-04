
from sys import argv as args
from JSPrint import JSPrint as JSP
from Connection import Connection

args = args[1:]

connection = Connection.connection

try:
    com = connection.cursor()

    com.execute("CREATE DATABASE IF NOT EXISTS defaultdb;")

    com.execute("USE defaultdb;")

    com.execute("""CREATE TABLE IF NOT EXISTS `TaskDatabase` (
	`TaskID` INT unsigned NOT NULL AUTO_INCREMENT,
	`UserID` VARCHAR(32) NOT NULL,
	`Title` VARCHAR(255) NOT NULL,
	`Description` TEXT,
	`Type` TINYINT unsigned NOT NULL,
	`Date` DATE,
	PRIMARY KEY (`TaskID`));""")

    com.execute("SELECT * FROM TaskDatabase WHERE UserID='"+args[0]+"';")

    JSP.outputKnown("UserTask", com.fetchall())



except Exception as e:
    JSP.outputKnown("error",e)

finally:
    JSP.outputKnown("close", connection.close())