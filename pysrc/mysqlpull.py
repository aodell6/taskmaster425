from JSPrint import JSPrint as JSP
from Connection import Connection

connection = Connection.connection

try:
    cursor = connection.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS `TaskDatabase` (
	`TaskID` INT unsigned NOT NULL AUTO_INCREMENT,
	`UserID` INT NOT NULL,
	`TaskTitle` VARCHAR(255) NOT NULL,
	`TaskDescription` TEXT  NOT NULL,
	`TaskType` TINYINT unsigned NOT NULL DEFAULT '0',
	`DueDate` DATE NOT NULL,
	PRIMARY KEY (`TaskID`));""")


    cursor.execute('INSERT INTO TaskDatabase ("UserID", "TaskTitle", "TaskDescription", "TaskType", "DueDate") VALUES (1, "test title","test desc",1, "2023-10-31")')
    JSP.output(cursor.fetchall())

except Exception as e:
    JSP.outputKnown("error",e)

finally:
    JSP.outputKnown("close", connection.close())
