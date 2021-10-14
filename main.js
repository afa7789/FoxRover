import * as fs from 'fs';

// exiting function
function exitFunction(msg){
    console.log(msg);
    process.exit(1);
}

//file helper, helper string to print
function fileHelper(){
    let string = "the file can't have more than or less than 5 lines\n must have 5 lines following the patern bellow:"
    string += "\n5 5"
    string += "\n1 2 N"
    string += "\nLMLMLMLMM"
    string += "\n3 3 E"
    string += "\nMMRMMRMRRM"
    string += "\n\n\n read the README at https://github.com/afa7789/fox-rover for more info about"
   
    return string
}

//args helper, helper string to print
function argsHelper(){
    let string = "\tWrong call it must be either"
    string += "\n\tnode.js main.js"
    string += "\n\tor"
    string += "\n\tnode main.js file.txt"
    string += "\n3 3 E"
    string += "\n\tfile.txt must have the command orders."
    string += "\n\n\n read the README at https://github.com/afa7789/fox-rover for more info about"
   
    return string
}

//initiliazer function
async function initiliaze(){

    const args = process.argv;
    // if args is more than 3
    if ( args.length > 3){
        exitFunction(argsHelper())
    // args is exactly 3
    }else if(args.length == 3 ){
        try{
            let file_content = fs.readFileSync(args[2],{encoding:'utf8', flag:'r'})
            let lines = file_content.split('\n')
            if( lines.length > 5 || lines.length  < 5 ){
                exitFunction(fileHelper())
            }else{

            }
        // error
        }catch(e){
            exitFunction("can't open file, error:"+e);
        }
    }else{
        //the show must go on without file input.
    }
}

initiliaze()

