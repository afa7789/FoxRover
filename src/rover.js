
const cardinals = {
 "N":0,
 "E":90,
 "S":180,
 "W":270,
}

class Rover {

    // tables with function calls
    tableFunctions = {
        'R' : this.rotateRight,
        'L' : this.rotateLeft,
        'M' : this.move
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
    rotateLeft(direction){
        direction -= 90;
        if ( direction < 0 ){
            direction += 360
        }
        return direction
    }

    // rotate right increase 90 degress
    rotateRight(direction){
        direction += 90;
        if ( direction >= 360 ){
            direction -= 360
        }
        return direction
    }

    //move , i mean change the X and Y
    move(direction,tableMove){
        var number = direction
        return { X: tableMove[number].X, Y: tableMove[number].Y}
    }

    // receive Entry receives an Letter and returns true or false if acceptable, and move if correct
    receiveEntry(entry){
        if (entry in this.tableFunctions ){
            if ( entry != 'M'){
                this.direction = this.tableFunctions[entry](this.direction);
            }else{
                var new_pos = this.tableFunctions[entry](this.direction,this.tableMove);
                this.X += new_pos.X
                this.Y += new_pos.Y
            }
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
        return Object.keys(cardinals).find(key => cardinals[key] === this.direction);
    }

    // print as correct
    prettyPrintRover(){
        // 5 1 E
        console.log(this.X + " " + this.Y + " " + this.getCardinal())
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
        this.errors = []
        this.control_failure = this.validate_parse(payload)
        this.width = payload.width
        this.height = payload.height
        this.commands1 = payload.rover1.commands
        this.commands2 = payload.rover2.commands 
        this.rover1 = new Rover(
            parseInt(payload.rover1.x),
            parseInt(payload.rover1.y),
            payload.rover1.cardinal
        )
        this.rover2 = new Rover(
            parseInt(payload.rover2.x),
            parseInt(payload.rover2.y),
            payload.rover2.cardinal
        )
    }

    //check if cardinal is correct
    cardinalCheck(variable,var_name){
        if( !(variable.toUpperCase() in cardinals) ){
            this.errors.push("invalid cardinal for "+var_name+'\n')
            return false
        }
        return true
    }

    //parseInt in variable check for errors
    intParserHere(variable,var_name){
        try{
            variable = parseInt(variable);
            if( variable <= 0){
                this.errors.push(var_name+" need to be bigger than zero"+'\n')
                return false
            }
            if( isNaN(variable) ){
                this.errors.push(var_name+" need to be a number"+'\n')
                return false
            }
            return true
        } catch (error) {
            this.errors.push(error+var_name+'\n')
            return false
        }
    }

    // validate if the input from payload is valid,
    // if false should fail on execute
    // parse to int payload too
    validate_parse(payload){
        let boolean_control = true
        this.intParserHere(payload.width,"width") ? '' : boolean_control =false
        this.intParserHere(payload.height,"heigth") ? '' : boolean_control =false
        this.intParserHere(payload.rover1.x,"rover1 x") ? '' : boolean_control =false
        this.intParserHere(payload.rover1.y,"rover1 y") ? '' : boolean_control =false
        this.intParserHere(payload.rover2.x,"rover2 x") ? '' : boolean_control =false
        this.intParserHere(payload.rover2.y,"rover2 y") ? '' : boolean_control =false
        this.cardinalCheck(payload.rover1.cardinal,"rover1") ? '' : boolean_control =false
        this.cardinalCheck(payload.rover2.cardinal,"rover1") ? '' : boolean_control =false
        return boolean_control;
    }

    //executeRover, receives array with commands and if they're correct execute, else it will return false
    // this changes the positions
    // check for out of bounds too
    executeRover(array,rover,rover_name){
        let status = true
        var pos
        array.map((value)=>{
            if (rover.receiveEntry(value) ){
                pos = rover.getPosition();
                // check if x is larger/lesser than the limits
                if( pos.X > this.width || pos.X < 0 ){
                    this.errors.push("wrong position for "+rover_name+" , it's out of bounds- X:" +pos.X+" Y"+pos.Y+'\n')
                    status = false
                }
                // check if y is larger/lesser than the limits
                if( pos.Y > this.height || pos.Y < 0 ){
                    this.errors.push("wrong position for "+rover_name+" , it's out of bounds- X:" +pos.X+" Y:"+pos.Y+'\n')
                    status = false
                }
            }else{
                this.errors.push("wrong command for "+rover_name+" == "+value+'\n')
                status = false
            }
        });
        return status
    }

    //Execute Logic
    executeLogic(){
        //check failure in validate
        if(!this.control_failure){
            return {status:false,msg:"wrong validation: "+this.errors.toString()};
        // normal flow
        }else{
            let status = true;
            //rover1
            this.executeRover(this.commands1,this.rover1,"rover1") ? '' : status=false
            //rover2
            this.executeRover(this.commands2,this.rover2,"rover2") ? '' : status=false
            
            //print results
            this.rover1.prettyPrintRover()
            this.rover2.prettyPrintRover()

            // if failure return error msg
            return (status) ? {status:status}: {status:status ,msg:"failure in rover procedure: "+this.errors.toString()}
        }
    }
}