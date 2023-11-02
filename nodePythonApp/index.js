const express = require('express')
//const {spawn} = require('child_process');

const app = express()

const pythonCaller = require("./pythonCaller")
const port = 3001


app.get('/', (req, res) => {

 var dataToSend;
 // spawn new child process to call the python script
 const python = pythonCaller.callPython("pysrc/mysqlpull.py")
 // collect data from script
 console.log(python)


})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
