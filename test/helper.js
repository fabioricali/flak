const helper = require('../src/helper');
const be = require('bejs');

describe('helper', function () {
    describe('findArrayIndex', function () {
        it('should be return an array', () => {
            let array = ['ciao', function(){}, 'world', [], 'hello', 'hi', function(){}, 'hello'] ;
            let result = helper.findArrayIndex('hello', array);
            console.log(result);
            be.err().equal(array[result[0]], 'hello');
            be.err().equal(array[result[1]], 'hello');
        });
    });
});