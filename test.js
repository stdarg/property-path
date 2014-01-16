'use strict';
var assert = require('assert');
var propPath = require('./index');


describe('propPath', function() {
    var testObj = {
        a: 1,
        b: true,
        c: {
            d: {
                e: 'Hello',
                f: [ 1, 2, false, 'hi' ]
            }
        }
    };

    it('get should return the right value for a given path', function() {

        assert.equal(1, propPath.get(testObj, 'a'));
        assert.equal(true, propPath.get(testObj, 'b'));

        var obj2 = {
            d: {
                e: 'Hello',
                f: [ 1, 2, false, 'hi' ]
            }
        };
        assert.deepEqual(obj2, propPath.get(testObj, 'c'));
        assert.equal('Hello', propPath.get(testObj, 'c.d.e'));

        assert.equal(1, propPath.get(testObj, 'a', '/'));
        assert.equal(true, propPath.get(testObj, 'b', '/'));
        assert.deepEqual(obj2, propPath.get(testObj, 'c', '/'));
        assert.equal('Hello', propPath.get(testObj, 'c/d/e', '/'));
    });

    it('set should modify the right property for a given path', function() {

        propPath.set(testObj, 'a', 2);
        assert.equal(2, testObj.a);
        assert.equal(3, propPath.set(testObj, 'a', 3));
        assert.equal(3, testObj.a);

        propPath.set(testObj, 'c.d.e', 'Greetings');
        assert.equal(testObj.c.d.e, 'Greetings');

        propPath.set(testObj, 'a', 2, '/');
        assert.equal(2, testObj.a);
        assert.equal(3, propPath.set(testObj, 'a', 3));
        assert.equal(3, testObj.a);

        propPath.set(testObj, 'c/d/e', 'Greetings', '/');
        assert.equal(testObj.c.d.e, 'Greetings');

        assert.equal(333, propPath.set(testObj, 'c/d/f/0', 333, '/'));
        assert.equal(333, testObj.c.d.f[0]);
    });
});
