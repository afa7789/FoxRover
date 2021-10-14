// var assert = require('assert');
import assert from 'assert'
// import expect from 'expect'
import { exec } from 'child_process'

function codeOutLog(error, stdout, stderr) {
    console.log({
        a: error.signal, b: error.killed, f:error.code, c: error, d: stdout, e: stderr
    })
}

describe('Sucessfull TestCases', function () {
    it('normal case exceds test', function (done) {
        exec('node main.js tests_cases/test_sample', (error, stdout, stderr) => {
            assert.deepEqual(error,null)
            done()
        });
    });
});

describe('Failure TestCases', function () {
    
    function default_test_here(description,file){
        it(description, function ( done ) {
            exec('node main.js tests_cases/'+file, (error, stdout, stderr) => {
                // console.log(stdout)
                assert.notEqual(error,null)
                assert.deepEqual(error.code,1)
                done()
            });
        });
    }

    default_test_here('out_of_bounds fail in test','test_sample_out_of_bounds')
    default_test_here('validation fail in test','test_sample_validate_error')
    default_test_here('validation fail in test','test_sample_wrong_command')
    
});
