// --------------------
// shimming module
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	shimming = require('../lib/');

// init
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

describe('Tests', function() {
	it.skip('all features', function() {
		expect(shimming).to.be.ok;
	});
});
