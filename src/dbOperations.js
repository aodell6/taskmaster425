const config = require("./dbConfig");
sql = require("mysql2/promise");

const getTask = async (userInformation) => {
    try{
        let pool =  await sql.connect(config);

        let data = await pool.request().query(`SELECT * FROM TaskDatabase WHERE UserID='${userInformation.userID}';`);

        return data;
    }
    catch(error){
        console.error(error);
    }
};

const createTask = async (userInformation) => {
    try{
        let pool = await sql.connect(config)

        let data = await pool.request().query(
            `INSERT INTO TaskDatabase (UserID, Title, Description, Type, Date) VALUES ('${userInformation.userID}', '${userInformation.title}', '${userInformation.description}', ${userInformation.type}, '${userInformation.date}');`
        );
    }
    catch(error){
        console.error(error);
    }
};

const getUser = async (userInformation) => {
    try{
        let pool = await sql.connect(config)

        let data = await pool.request().query(
            `SELECT * FROM LoginDatabase WHERE UserID='${userInformation.userID}'`
        );


        let output = {userExist: false, matching: false};

        if(!data.isEmpty()){
            output.userExist = true;
            output.matching = (userInformation.password === data.password);
        }


        return output;
    }
    catch(error){
        console.error(error);
    }
};

const createUser = async (userInformation) => {
    try{
        let pool = await sql.connect(config)

        let userExist = {exist: true, matching: false};

        let data = await pool.request().query(
            `SELECT * FROM LoginDatabase WHERE UserID='${userInformation.userID}'`
        );

        if(data.isEmpty()){
            userExist.exist = false;
            if (`${userInformation.password1}` === `${userInformation.password2}`){

                data = await pool.request().query(
                `INSERT INTO LoginDatabase (UserID, Password) VALUES ('${userInformation.userID}','${userInformation.password}')`
                );
                userExist.matching = true;
            }
        }
        return userExist;
    }
    catch(error){
        console.error(error);
    }
};

const deleteTask = async (cusotmer) => {
    try{
        let pool = await sql.connect(config);

        let data = await pool.request().query(
            `DELETE FROM tasks WHERE UserID = '${userInformation.userID}' AND TaskID='${userInformation.taskID}'`
        )
    }
    catch(error){
        console.error(error);
    }
};

const modifyTask = async (userInformation) => {
    try{
        let pool = await sql.connect(config);

        let data = await pool.request().query(
            `UPDATE TaskDatabase SET Title='${userInformation.title}', Description='${userInformation.description}', Type=${userInformation.type}, Date='${userInformation.date}' WHERE TaskID='${userInformation.taskID}', UserID='${userInformation.userID}';`
        );
    }
    catch(error){
        console.error(error);
    }
};

module.exports = {
    getTask,
    createTask,
    getUser,
    createUser,
    deleteTask,
    modifyTask
};
