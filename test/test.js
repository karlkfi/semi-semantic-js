#!/usr/bin/env node

// Executable js file

const assert = require('assert');
const shuffle = require('shuffle-array');
const semi_semantic = require('../semi-semantic.js');

// parse a list of semi-semantic version strings
function parseList(input) {
  var output = new Array(input.length);
  for (var i = 0, len = input.length; i < len; i++) {
    output[i] = semi_semantic.parse(input[i]);
  }
  return output;
}

// run toString on a list of semi-semantic Version objects
function toStringList(input) {
  var output = new Array(input.length);
  for (var i = 0, len = input.length; i < len; i++) {
    output[i] = input[i].toString();
  }
  return output;
}

// parse, shuffle, sort, assert order, repeat N times
function assertSortOrder(ordered) {
  var N = 5;
  var parsed = parseList(ordered);
  for (var i = 0, len = N; i < len; i++) {
    shuffle(parsed)
    assert.deepEqual(toStringList(parsed.sort(semi_semantic.sort)), ordered);
  }
}

describe('semi_semantic', function() {
  describe('#sort()', function() {
    it('should sort numeric release segment components numerically', function() {
      assertSortOrder(["1.2.3", "1.2.4", "1.2.5"]);
      assertSortOrder(["1.2.1", "1.2.9", "1.2.10"]);
    });

    it('should sort numeric pre_release segment components numerically', function() {
      assertSortOrder(["1.2.3-1", "1.2.3-9", "1.2.3-10"]);
      assertSortOrder(["1.2.3-1.1", "1.2.3-1.9", "1.2.3-1.10"]);
    });

    it('should sort non-numeric pre_release segment components alphanumerically', function() {
      assertSortOrder(["1.2.3-alpha.1", "1.2.3-alpha.2", "1.2.3-beta.1"]);
      assertSortOrder(["1.2.3-alpha1", "1.2.3-beta1", "1.2.3-rc1"]);
    });

    it('should sort numeric post_release segment components numerically', function() {
      assertSortOrder(["1.2.3+1234", "1.2.3+2345", "1.2.3+3456"]);
    });

    it('should sort non-numeric post_release segment components alphanumerically', function() {
      assertSortOrder(["1.2.3+aaa.1", "1.2.3+aaa.2", "1.2.3+bbb.1"]);
      assertSortOrder(["1.2.3+aaa1", "1.2.3+bbb2", "1.2.3+ccc1"]);
    });

    it('should sort pre_release < release < post_release', function() {
      assertSortOrder(["1.2.3-alpha", "1.2.3", "1.2.3+1234"]);
    });

    it('should sort pre_release < pre_release+post_release < release', function() {
      assertSortOrder(["1.2.3-alpha", "1.2.3-alpha+1234", "1.2.3"]);
    });
  });
});
