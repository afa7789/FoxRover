import { parse } from "path";

const cardinals = {
 "N":0,
 "E":90,
 "S":180,
 "W":270,
}

class Rover {

    // tables with function calls
    tableFunctions = {
        'R' : ()=>{this.rotateRight()},
        'L' : ()=>{this.rotateLeft()},
        'M' : ()=>{this.move()}
    }

    // tables with moves
    tableMove = {
        0 : {
            X: 0,
            Y: 1
        },
        90 : {
            X: 1,
            Y: 0
        },
        180 :  {
            X: 0,
            Y: -1
        },
        270 : {
            X: -1,
            Y: 0
        }
    }
    
    constructor(initialPosX,initialPosY,cardinalDirection){
        this.X = initialPosX;
        this.Y = initialPosY;
        this.direction = cardinals[cardinalDirection];
    }
    
    // rotate left decreases 90 degress
    rotateLeft(){
        this.direction -= 90;
        if ( this.direction < 0 ){
            this.direction += 360
        }
    }

    // rotate right increase 90 degress
    rotateRight(){
        this.direction += 90;
        if ( this.direction >= 360 ){
            this.direction -= 360
        }
    }

    //move , i mean change the X and Y
    move(){
        var number = this.direction
        this.X += this.tableMove[number].X
        this.Y += this.tableMove[number].Y
        return { X: this.X, Y: this.Y}
    }

    // receive Entry receives an Letter and returns true or false if acceptable, and move if correct
    receiveEntry(entry){
        if (entry in this.tableFunctions ){
            this.tableFunctions[entry];
            return true;
        }else{
            return false;
        }
    }

    // get Position will return actual X,Y
    getPosition(){
        return { X: this.X, Y: this.Y}
    }

    // getCardinal, returns the cardinal Letter according to the angle
    getCardinal(){
        return Object.keys(cardinals).find(key => object[key] === this.angle);
    }
}

export class LogicState{

    /*constructor for LogicState
        payload:{
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
    */
    constructor(payload){
        this.errors = ['teste']
        this.control_failure = this.validate_parse(payload)
        this.commands1 = payload.rover1.commands
        this.commands2 = payload.rover2.commands 
        this.rover1 = new Rover(payload.rover1.x,payload.rover1.y,payload.rover1.cardinal)
        this.rover2 = new Rover(payload.rover1.x,payload.rover1.y,payload.rover1.cardinal)
    }

    //check if cardinal is correct
    cardinalCheck(variable,var_name){
        if( !(variable.toUpperCase() in cardinals) ){
            this.errors.push("invalid cardinal for "+var_name)
            return false
        }
        return true
    }

    //parseInt in variable check for errors
    intParserHere(variable,var_name){
        try{
            variable = parseInt(variable);
            console.log(var_name,variable)
            if( variable <= 0){
                this.errors.push(var_name+" need to be bigger than zero")
                return false
            }
            if( isNaN(variable) ){
                this.errors.push(var_name+" need to be a number")
                return false
            }
            return true
        } catch (error) {
            this.errors.push(error+var_name)
            return false
        }
    }

    // validate if the input from payload is valid,
    // if false should fail on execute
    // parse to int payload too
    validate_parse(payload){
        let boolean_control = true

        this.intParserHere("arthur","arthur")

        this.intParserHere(payload.width,"width")
        this.intParserHere(payload.heigth,"heigth")
        this.intParserHere(payload.rover1.x,"rover1 x")
        this.intParserHere(payload.rover1.y,"rover1 y")
        this.intParserHere(payload.rover2.x,"rover2 x")
        this.intParserHere(payload.rover2.y,"rover2 y")
        this.cardinalCheck(payload.rover1.cardinal,"rover1")
        this.cardinalCheck(payload.rover2.cardinal,"rover1")
        console.log(this.errors)
        return boolean_control;
    }

    executeLogic(){
        if(!this.control_failure){
            return {status:false,msg:"wrong validation"+this.errors.toString()};
        }else{
            return true;
        }
    }
}

//.map((x)=>{return parseInt(x)}) // dois ints, {width,height}
/*
    try {
        intValue = Integer.parseInt(string);
        return true;
    } catch (NumberFormatException e) {
        System.out.println("Input String cannot be parsed to Integer.");
    }
*/