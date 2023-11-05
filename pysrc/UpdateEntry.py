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

    com.execute("""UPDATE TaskDatabase
                SET Title = {title}, Description = {desc}, Type = {comp}, Date = {date}
                WHERE TaskID = {task},UserID = {user};""".format(task = args[0], user = args[1], title = args[2], desc = args[3], comp = args[4], date = args[5]))
    
    com.execute("COMMIT;")

    JSP.outputKnown("UpdateTask", com.fetchall())

except Exception as e:
    JSP.outputKnown("error",e)

finally:
    JSP.outputKnown("close", connection.close())