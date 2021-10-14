import * as fs from 'fs';
import readlineSync from 'readline-sync'
import {LogicState} from './src/rover.js'
// exiting function
function exitFunction(msg){
    console.log(msg);
    process.exit(1);
}

// input data example helper, string to print
function inputDataExampleHelper(){
    let string = "5 5"
    string += "\n1 2 N"
    string += "\nLMLMLMLMM"
    string += "\n3 3 E"
    string += "\nMMRMMRMRRM"
    string += "\n---------"
    return string
}

//file helper, helper string to print
function fileHelper(){
    let string = "the file can't have more than or less than 5 lines\n must have 5 lines following the patern bellow:"
    string += "\n" + inputDataExampleHelper();
    string += "\n\n\n read the README at https://github.com/afa7789/fox-rover for more info about"
   
    return string
}

//args helper, helper string to print
function argsHelper(){
    let string = "\tWrong call it must be either"
    string += "\n\tnode.js main.js"
    string += "\n\tor"
    string += "\n\tnode main.js file.txt"
    string += "\n\tfile.txt must have the command orders."
    string += "\n\n\n read the README at https://github.com/afa7789/fox-rover for more info about"
   
    return string
}

// lines parser on pattern
function readLines(lines){
    let [width,height] = lines[0].split(' ')
    let [xpos1,ypos1,cardinal1] = lines[1].split(' ')
    let rover1_commands = [...lines[2]]
    let [xpos2,ypos2,cardinal2] = lines[3].split(' ')
    let rover2_commands = [...lines[4]]

    // returning formated 
    return {
        width:width,
        height:height,
        rover1:{
            x:xpos1,
            y:ypos1,
            cardinal:cardinal1,
            commands:rover1_commands
        },
        rover2:{
            x:xpos2,
            y:ypos2,
            cardinal:cardinal2,
            commands:rover2_commands
        }
    }
}

// get user Input from the next 5 lines following the pattern
function getUserInput(){
    let lines = []
    console.log('Please Input data as Follows:')
    console.log(inputDataExampleHelper())
    lines[0] = readlineSync.question()
    lines[1] = readlineSync.question()
    lines[2] = readlineSync.question()
    lines[3] = readlineSync.question()
    lines[4] = readlineSync.question()
    return lines
}

//initiliazer function
async function initiliaze(){
    let lines = []
    const args = process.argv;
    // if args is more than 3
    if ( args.length > 3){
        exitFunction(argsHelper())
    // args is exactly 3
    }else if(args.length == 3 ){
        try{
            let file_content = fs.readFileSync(args[2],{encoding:'utf8', flag:'r'})
            lines = file_content.split('\n')
            if( lines.length > 5 || lines.length  < 5 ){
                exitFunction(fileHelper())
            }
        // error
        }catch(e){
            exitFunction("can't open file, error:"+e);
        }
    }else{
        //the show must go on without file input.
        lines = getUserInput()
    }

    //LogicState imported to run over the code needs
    let ls = new LogicState(readLines(lines))
    let returned_ls = ls.executeLogic()
    if(returned_ls.status){
        exitFunction(returned_ls.msg)
    }
}

initiliaze()
