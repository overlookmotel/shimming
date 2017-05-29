# shimming.js

[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/shimming.svg)](https://greenkeeper.io/)

# A very small library of functions to shim other libraries

## What it does

Shims or "monkey patches" a function or collection of functions.

Methods:

* `shimOne()` - wraps the named method of an object in a wrapper function
* `shim()` - wraps various methods in wrapper functions

## Current status

[![NPM version](https://img.shields.io/npm/v/shimming.svg)](https://www.npmjs.com/package/shimming)
[![Build Status](https://img.shields.io/travis/overlookmotel/shimming/master.svg)](http://travis-ci.org/overlookmotel/shimming)
[![Dependency Status](https://img.shields.io/david/overlookmotel/shimming.svg)](https://david-dm.org/overlookmotel/shimming)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/shimming.svg)](https://david-dm.org/overlookmotel/shimming)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/shimming/master.svg)](https://coveralls.io/r/overlookmotel/shimming)

API is stable.
No tests but it's so simple that's not a big problem - it works!

## Usage

### shimming.shimOne(obj, methodName, shimFn)

Replaces obj[methodName] with the shimFn provided.
shimFn is called shimFn(originalMethod, [arguments])
originalMethod is bound to 'this' in the context of the function call. i.e. originalMethod can be called directly originalMethod() rather than needing to do originalMethod.call(this)

Example usage:

```js
var a = { isTheBest: function(x) { return x + ' is the best'; } };
shimming.shimOne(a, 'isTheBest', function(originalFn, x) { return originalFn(x) + ' mostly'; });
a.isTheBest('monkey') // returns 'monkey is the best mostly'
```

### shimming.shim(obj, shimFns)

Replaces object methods with the wrapper methods provided.

Example usage:

```js
var a = {
	status: 'drunk',
	isStatus: function(x) { return x + ' is ' + this.status; },
	isTheBest: function(x) { return x + ' is the best'; },
	isTheWorst: function(x) { return x + ' is the worst'; }
};

var wrapper = function(originalFn, x) { return originalFn(x) + ' mostly'; };

shimming.shim(a, {
	isStatus: wrapper,
	isTheBest: wrapper,
});

a.isStatus('monkey') // returns 'monkey is drunk mostly'
a.isTheBest('monkey') // returns 'monkey is the best mostly'
a.isTheWorst('monkey') // returns 'monkey is the worst' - it wasn't wrapped
```

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

Except there aren't any at present! Anyone want to write some?

## Changelog

See changelog.md

## TODO

* Try using `obj[methodName] = shimFn.bind(this, originalFn.bind(this))` instead of current way of passing to originalFn

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/shimming/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
