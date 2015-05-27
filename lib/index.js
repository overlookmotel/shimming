// --------------------
// shimming.js
// Shim methods, e.g. to warp another another library
// --------------------

var shimming = module.exports = {
	/*
	 * Wraps a method of an object in a wrapper function provided
     * The shimmed function replaces the original method in the object
	 *
	 * shimFn = the wrapper function
	 * shimFn is called with arguments of the original function followed by the arguments used in the function call
	 * originalFn is bound to this before being provided to wrapper function
	 *
	 * Example:
     * var a = { isTheBest: function(x) { return x + ' is the best'; } };
     * shimming.shimOne(a, 'isTheBest', function(originalFn, x) { return originalFn(x) + ' mostly'; });
	 * a.isTheBest('monkey') // returns 'monkey is the best mostly'
	 */
	shimOne: function(obj, methodName, shimFn) {
		var originalFn = obj[methodName];

		obj[methodName] = function() {
			var args = Array.prototype.slice.call(arguments);
			args.unshift(originalFn.bind(this));

			return shimFn.apply(this, args);
		};
	},

	/*
	 * Wraps several methods of an object in wrapper functions provided
	 */
	shim: function(obj, shimFns) {
		for (var methodName in shimFns) {
			shimming.shimOne(obj, methodName, shimFns[methodName]);
		}
	}
};
