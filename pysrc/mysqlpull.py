import pymysql
import json

ouput = dict()

timeout = 10
connection = pymysql.connect(
    charset="utf8mb4",
    connect_timeout=timeout,
    cursorclass=pymysql.cursors.DictCursor,
    db="defaultdb",
    host="mysql-d51f41f-nathan-a42e.a.aivencloud.com",
    password="AVNS_3kWPcqsUyzZ8o_Ylw1a",
    read_timeout=timeout,
    port=21984,
    user="avnadmin",
    write_timeout=timeout,
)

try:
    cursor = connection.cursor()
    cursor.execute("USE TaslDatabase")
    cursor.execute("""CREATE TABLE `TaskDatabase` (
	`TaskID` INT unsigned NOT NULL AUTO_INCREMENT,
	`UserID` INT NOT NULL,
	`TaskTitle` VARCHAR(255) NOT NULL,
	`TaskDescription` TEXT  NOT NULL,
	`TaskType` TINYINT unsigned NOT NULL DEFAULT '0',
	`DueDate` DATE NOT NULL,
	PRIMARY KEY (`TaskID`));""")


    cursor.execute('INSERT INTO TaskDatabase ("UserID", "TaskTitle", "TaskDescription", "TaskType", "DueDate") VALUES (1, "test title","test desc",1, "2023-10-31")')
    print({"cursor.fetchall":cursor.fetchall()})

except Exception as e:
    print({"error":e})

finally:
    connection.close()
