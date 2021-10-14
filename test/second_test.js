// var assert = require('assert');
// import assert from 'assert'
import { exec } from 'child_process'

function codeOutLog(error, stdout, stderr) {
    console.log({
        a: error.signal, b: error.killed, f:error.code, c: error, d: stdout, e: stderr
    })
}

describe('TestCase One', function () {
    it('first exec test', function (done) {
        // var exec = require('child_process').exec;
        exec('node main.js tests_cases/test_sample', (error, stdout, stderr) => {
            // console.log(error.signal, error.killed, error, stdout, stderr)
            codeOutLog(error, stdout, stderr)
            done()
        });
    });
});

describe('TestCase Two', function () {
    it('first exec test', function (done) {
        // var exec = require('child_process').exec;
        exec('node main.js tests_cases/test_sample_out_of_bounds', (error, stdout, stderr) => {
            codeOutLog(error, stdout, stderr)
            done()
        });
    });
});
