const { spawn } = require('child_process');
/** remove warning that you don't care about */
function cleanWarning(error) {
    return error.replace(/Detector is not able to detect the language reliably.\n/g,"");
}

function callPythonArgs(scriptName, args) {
    return new Promise(function(success, reject) {
        const pyArgs = [script, JSON.stringify(args) ]
        const pyprog = spawn("python", ([scriptName].concat(pyArgs)));
        let result = "";
        let resultError = "";
        pyprog.stdout.on('data', function(data) {
            result += data.toString();
        });

        pyprog.stderr.on('data', (data) => {
            resultError += cleanWarning(data.toString());
        });

        pyprog.stdout.on("end", function(){
            if(resultError == "") {
                success(JSON.parse(result));
            }else{
                console.error(`Python error, you can reproduce the error with: \n${scriptName} ${pyArgs.join(" ")}`);
                const error = new Error(resultError);
                console.error(error);
                reject(resultError);
            }
        })
   });
}

function callPython(scriptName) {
    return new Promise(function(success, reject) {
        const pyprog = spawn("python", [scriptName]);
        let result = "";
        let resultError = "";
        pyprog.stdout.on('data', function(data) {
            result += data.toString();
        });

        pyprog.stderr.on('data', (data) => {
            resultError += cleanWarning(data.toString());
        });

        pyprog.stdout.on("end", function(){
            if(resultError == "") {
                success(JSON.parse(result));
            }else{
                console.error(`Python error, you can reproduce the error with: \n${scriptName}}`);
                const error = new Error(resultError);
                console.error(error);
                reject(resultError);
            }
        })
   });
}
module.exports = { callPython, callPythonArgs };