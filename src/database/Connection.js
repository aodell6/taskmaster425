const mysql = require('mysql2/promise');
//const bluebird = require('bluebird');
class Connection{
    constructor(){
        this.timeout = 10;

        this.connection = mysql.createConnection({
            charset : "utf8mb4",
            connect_timeout : timeout,
            db : "defaultdb",
            host : "mysql-d51f41f-nathan-a42e.a.aivencloud.com",
            password : "AVNS_3kWPcqsUyzZ8o_Ylw1a",
            read_timeout : timeout,
            port : 21984,
            user : "avnadmin",
            write_timeout : timeout,
        });
    }

    async command(command){
        return connection.execute(command,
        dataOut(err, results, fields));
    }

    dataOut(err, results, fields){
        if(err) console.error(err);
        console.log(results);
        console.log(fields);
        return results
    }

    async commit(){
        this.command("COMMIT;");
    }

    async useDatabase(){
        this.command("CREATE DATABASE IF NOT EXISTS defaultdb;")
        this.command("USE defaultdb;")
    }

    async loginTable(userID, password){
        this.useDatabase();
        this.command("CREATE TABLE IF NOT EXISTS  LoginDatabase (`UserID` VARCHAR(32) NOT NULL, `Password` VARCHAR(127) NOT NULL, PRIMARY KEY (`UserID`));");
    }

    async taskTable(){
        this.useDatabase();
        this.command("CREATE TABLE IF NOT EXISTS TaskDatabase (`TaskID` INT unsigned NOT NULL AUTO_INCREMENT, `UserID` VARCHAR(32) NOT NULL, `Title` VARCHAR(255) NOT NULL, `Description` TEXT, `Type` TINYINT unsigned NOT NULL, `Date` DATE, PRIMARY KEY (`TaskID`));");
    }

    async login(userID, password){
        this.loginTable();
        var data = await this.command("SELECT * FROM LoginDatabase WHERE UserID='"+userID+"';")
        if(data) return (data["Password"] === password);

    }

    async newTask(userID, title, description, type, date){
        this.taskTable();
        this.command("INSERT INTO TaskDatabase ('UserID', 'Title', 'Description', 'Type', 'Date') VALUES (" + userID + ", " + title + ", " + description + ", " + type + ", " + date + ");");
        this.commit();
    }

    async getUserTasks(userID){
        this.taskTable();
        var data = this.command("SELECT * FROM TaskDatabase WHERE UserID='"+userID+"';")
        return data;
    }

    async getAllTasks(){
        this.taskTable();
        var data = this.command("SELECT * FROM TaskDatabase;")
        return data;
    }

    async updateTask(taskID, userID, title, description, type, date){
        this.taskTable();
        this.command("UPDATE TaskDatabase SET Title = " + title + ", Description = " + description + ", Type = " + type + ", Date = " + date + " WHERE TaskID = " + taskID + ",UserID = " + userID + ";")
    }

    async deleteTask(userID, taskID){
        this.taskTable();
        this.command("DELETE * FROM TaskDatabase WHERE UserID=" + userID + " AND TaskID=" + taskID + ";");
        this.commit();
    }

    async newUser(username, password1, password2){
        if (password1 === password2){
            this.loginTable();
            this.command("INSERT INTO LoginDatabase VALUES " + username + ", " + password1 + ";");
            this.commit();
            return true;
        }
        return false
    }



}

export Connection();
