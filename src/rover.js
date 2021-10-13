
const cardinals = {
 "N":0,
 "E":90,
 "S":180,
 "W":270,
}

class Rover {

    // tables with function calls
    tableFunctions = {
        'R' : rotateRight(),
        'L' : rotateLeft(),
        'M' : move()
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
        this.X += tableMove[this.direction].X
        this.Y += tableMove[this.direction].Y
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

class logicState{

    constructor(starting){
        if ( validate() ){
            this.algo = starting;
        }
    }

    validate(){
        return true;
    }
}
