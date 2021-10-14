![!FoxRover](resources/foxrover.png)
# Fox Rover
A simple Node.js showcase of unit testing with Mocha / logics and programming domain with Js functions/classes features etc.

## Running the code

`git clone https://github.com/afa7789/fox-rover`

`cd fox-rover`

`node main.js`

or

`node main.js file`

check test files on tests folder.

## Testing

I'm using Mocha to run it is:

`./node_modules/mocha/bin/mocha`

or

`npm test`

### Whole Testing

I'm doing a little more complex testing in the *second_test.js* i call the node main.js with the tests_cases and getting the exit code of the node. This works fine as a test because i've covered the erros in the programn to be exited with error code, by doing so i can use this to test the application as a whole.

Instead of testing small pieces i'm testing the entry and it's error code output

### Unit Testing

This will test smaller piece of codes to check if anyone broke a function/whatever it will be stored in the first_test.js, it's mainly to show the domain over assert/unit test knowledge

### Test Output

```
> fox-rover@1.0.0 test /fox-rover
> ./node_modules/mocha/bin/mocha



  Test LogicState Validation
    #Sucessfull Validation
      ✔ should return true
    #Failing Validation
      ✔ fails validation for wrong width
      ✔ fails validation for wrong height
      ✔ fails validation for wrong position x
      ✔ fails validation for wrong position y
      ✔ fails validation for wrong cardinal

  Test CommandRead
    #Succesfull Commands
1 3 N
5 1 E
returned ls { status: true }
      ✔ rover commands succeded
    #Failing Commands
3 4 N
5 1 E
      ✔ fails commands for wrong input
1 10 N
5 1 E
      ✔ fails commands for out of bounds

  Sucessfull TestCases
    ✔ normal case exceds test (57ms)

  Failure TestCases
    ✔ out_of_bounds fail in test (54ms)
    ✔ validation fail in test (55ms)
    ✔ validation fail in test (57ms)


  13 passing (235ms)
```

## **Problem**
A squad of robotic rovers are to be landed by NASA on a plateau on
Mars. This plateau, which is curiously rectangular, must be navigated
by the rovers so that their on-board cameras can get a complete view
of the surrounding terrain to send back to Earth.
A rover's position and location is represented by a combination of x
and y co-ordinates and a letter representing one of the four cardinal
compass points. The plateau is divided up into a grid to simplify
navigation. An example position might be 0, 0, N, which means the
rover is in the bottom left corner and facing North.
In order to control a rover, NASA sends a simple string of letters.
The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the
rover spin 90 degrees left or right respectively, without moving from


its current spot. 'M' means move forward one grid point, and maintain
the same heading.
Assume that the square directly North from (x, y) is (x, y+1).
## **Input**
The first line of input is the upper-right coordinates of the
plateau, the lower-left coordinates are assumed to be 0,0.
The rest of the input is information pertaining to the rovers that
have been deployed. Each rover has two lines of input. The first line
gives the rover's position, and the second line is a series of
instructions telling the rover how to explore the plateau.
The position is made up of two integers and a letter separated by
spaces, corresponding to the x and y co-ordinates and the rover's
orientation.
Each rover will be finished sequentially, which means that the second
rover won't start to move until the first one has finished moving.
## **Output**
The output for each rover should be its final co-ordinates and
heading.

## Tests
### **Test Input**
5 5

1 2 N

LMLMLMLMM

3 3 E

MMRMMRMRRM

### **Expected Output**

1 3 N

5 1 E
