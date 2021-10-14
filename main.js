import * as fs from 'fs';

function exitFunction(msg){
    console.log(msg);
    process.exit(1);
}

function initiliaze(){
    const args = process.argv;

    if ( args.length > 3){
        exitFunction("\tWrong call it must be either\n\tnode.js main.js\n\tor\n\tnode main.js file.txt\n\tfile.txt must have the command orders.")
    }else if(args.length == 3 ){
        fs.open(args[2],'r', function (err, f) {
            if (err) {
                exitFunction("error on file to open:\n"+err)
                return
            }
            console.log("File opened!!");
        })
    }
}

initiliaze()

