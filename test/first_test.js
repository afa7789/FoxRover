// var assert = require('assert');
import assert from 'assert'
import {LogicState} from '../src/rover.js'

// describe('Array', function() {
//     describe('#indexOf()', function() {
//         it('should return -1 when the value is not present', function() {
//         assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });

describe('Test LogicState Validation',function(){

    describe('#Sucessfull Validation',function(){
        it('should return true', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                },
                rover2:{
                    x:4,
                    y:4,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                }
            }
            let ls = new LogicState(payload)
            assert.equal(ls.validate_parse(payload),true)
        });
    });

    describe('#Failing Validation',function(){

        it('fails validation for wrong width', function() {
            let payload = {
                width:"TR",
                height:5,
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                },
                rover2:{
                    x:4,
                    y:4,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                }
            }
            let ls = new LogicState(payload)
            assert.equal(ls.validate_parse(payload),false)
        });

        it('fails validation for wrong height', function() {
            let payload = {
                width:5,
                height:"TR",
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                },
                rover2:{
                    x:4,
                    y:4,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                }
            }
            let ls = new LogicState(payload)
            assert.equal(ls.validate_parse(payload),false)
        });

        it('fails validation for wrong position x', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:"rr",
                    y:2,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                },
                rover2:{
                    x:4,
                    y:4,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                }
            }
            let ls = new LogicState(payload)
            assert.equal(ls.validate_parse(payload),false)
        });

        it('fails validation for wrong position y', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:2,
                    y:"rr",
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                },
                rover2:{
                    x:4,
                    y:4,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                }
            }
            let ls = new LogicState(payload)
            assert.equal(ls.validate_parse(payload),false)
        });

        it('fails validation for wrong cardinal', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"T",
                    commands:"LRLRLRLRLRLMM"
                },
                rover2:{
                    x:4,
                    y:4,
                    cardinal:"N",
                    commands:"LRLRLRLRLRLMM"
                }
            }
            let ls = new LogicState(payload)
            assert.equal(ls.validate_parse(payload),false)
        });
    });

});

describe('Test CommandRead',function(){
    describe('#Succesfull Commands',function(){
        it('rover commands succeded', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"N",
                    commands: [..."LMLMLMLMM"]
                },
                rover2:{
                    x:3,
                    y:3,
                    cardinal:"E",
                    commands: [..."MMRMMRMRRM"]
                }
            }

            let ls = new LogicState(payload)
            let returned_ls = ls.executeLogic()
            console.log('returned ls',returned_ls)
            assert.equal(returned_ls.status,true)
        });
    });

    describe('#Failing Commands',function(){
        it('fails commands for wrong input', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"N",
                    commands:[..."MMRMMRMRRMTT"]
                },
                rover2:{
                    x:3,
                    y:3,
                    cardinal:"E",
                    commands:[..."MMRMMRMRRM"]
                }
            }
            
            let ls = new LogicState(payload)
            assert.equal(ls.executeLogic().status,false)
        });
        it('fails commands for out of bounds', function() {
            let payload = {
                width:5,
                height:5,
                rover1:{
                    x:1,
                    y:2,
                    cardinal:"N",
                    commands:[..."LMLMLMLMMMMMMMMM"]
                },
                rover2:{
                    x:3,
                    y:3,
                    cardinal:"E",
                    commands:[..."MMRMMRMRRM"]
                }
            }
            
            let ls = new LogicState(payload)
            assert.equal(ls.executeLogic().status,false)
        });
    });
});