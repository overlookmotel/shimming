# shimming.js

A very small library of functions to shim other libraries

Methods:

* shimOne - wraps the named method of an object in a wrapper function
* shim - wraps various methods in wrapper functions

API is stable.

## Usage

### shimming.shimOne(obj, methodName, shimFn)

Replaces obj[methodName] with the shimFn provided.
shimFn is called shimFn(originalMethod, [arguments])
originalMethod is bound to 'this' in the context of the function call. i.e. originalMethod can be called directly originalMethod() rather than needing to do originalMethod.call(this)

Example usage:

	var a = { isTheBest: function(x) { return x + ' is the best'; } };
    shimming.shimOne(a, 'isTheBest', function(originalFn, x) { return originalFn(x) + ' mostly'; });
	a.isTheBest('monkey') // returns 'monkey is the best mostly'

### shimming.shim(obj, shimFns)

Replaces object methods with the wrapper methods provided.

Example usage:

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

## Tests

What tests? Anyone want to write some?

## Changelog

0.0.1

* Initial release

0.0.2

* package.json updated with repository

0.0.3

* Bug fix


## TODO

Try using `obj[methodName] = shimFn.bind(this, originalFn.bind(this))` instead of current way of passing to originalFn
