from JSPrint import JSPrint as JSP
from Connection import Connection

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

    com.execute("INSERT INTO TaskDatabase (UserID, Title, Description, Type, Date) VALUES ('TestUser1', 'test title1','test desc1', 1, '2023-10-31');")
    com.execute("COMMIT;")
    com.execute("SELECT * from TaskDatabase;")


    JSP.outputKnown("AllTask", com.fetchall())



except Exception as e:
    JSP.outputKnown("error",e)

finally:
    JSP.outputKnown("close", connection.close())