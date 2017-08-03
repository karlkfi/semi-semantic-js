#!/usr/bin/env node

// Executable js file

const assert = require('assert');
const semi_semantic = require('./semi-semantic.js');

// test 1
var v1 = semi_semantic.parse("1.2.3");
var v2 = semi_semantic.parse("1.2.4");
var v3 = semi_semantic.parse("1.2.5");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.3");
assert(sorted[1].toString() == "1.2.4");
assert(sorted[2].toString() == "1.2.5");

// test 2
var v1 = semi_semantic.parse("1.2.3-alpha");
var v2 = semi_semantic.parse("1.2.3-beta");
var v3 = semi_semantic.parse("1.2.3-rc");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.3-alpha");
assert(sorted[1].toString() == "1.2.3-beta");
assert(sorted[2].toString() == "1.2.3-rc");

// test 3
var v1 = semi_semantic.parse("1.2.3+1234");
var v2 = semi_semantic.parse("1.2.3+2345");
var v3 = semi_semantic.parse("1.2.3+3456");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.3+1234");
assert(sorted[1].toString() == "1.2.3+2345");
assert(sorted[2].toString() == "1.2.3+3456");

// test 4
var v1 = semi_semantic.parse("1.2.3");
var v2 = semi_semantic.parse("1.2.3-alpha");
var v3 = semi_semantic.parse("1.2.3+1234");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.3-alpha");
assert(sorted[1].toString() == "1.2.3");
assert(sorted[2].toString() == "1.2.3+1234");

// test 5
var v1 = semi_semantic.parse("1.2.3");
var v2 = semi_semantic.parse("1.2.3-alpha");
var v3 = semi_semantic.parse("1.2.3-alpha+1234");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.3-alpha");
assert(sorted[1].toString() == "1.2.3-alpha+1234");
assert(sorted[2].toString() == "1.2.3");

// test 6
var v1 = semi_semantic.parse("1.2.3-alpha+1234");
var v2 = semi_semantic.parse("1.2.3-alpha+2345");
var v3 = semi_semantic.parse("1.2.3-alpha");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.3-alpha");
assert(sorted[1].toString() == "1.2.3-alpha+1234");
assert(sorted[2].toString() == "1.2.3-alpha+2345");

// test 7
var v1 = semi_semantic.parse("1.2.10");
var v2 = semi_semantic.parse("1.2.9");
var v3 = semi_semantic.parse("1.2.8");
var sorted = [v3, v2, v1].sort(semi_semantic.sort);
assert(sorted[0].toString() == "1.2.8");
assert(sorted[1].toString() == "1.2.9");
assert(sorted[2].toString() == "1.2.10");

