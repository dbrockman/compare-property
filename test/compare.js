var should = require('should');
var compare = require('../');

var ascending = 1;
var descending = -1;

describe('compare', function () {

  it('should compare strings', function () {
    compare.compare('a', 'b', ascending).should.eql(-1);
    compare.compare('b', 'a', ascending).should.eql(1);
    compare.compare('a', 'a', ascending).should.eql(0);

    compare.compare('a', 'b', descending).should.eql(1);
    compare.compare('b', 'a', descending).should.eql(-1);
    compare.compare('a', 'a', descending).should.eql(0);
  });

  it('should compare strings and ignore case', function () {
    compare.compare('a', 'A', ascending, true).should.eql(0);
    compare.compare('a', 'B', ascending, true).should.eql(-1);
  });

  it('should compare numbers', function () {
    compare.compare(1, 2, ascending).should.eql(-1);
    compare.compare(2, 1, ascending).should.eql(1);
    compare.compare(1, 1, ascending).should.eql(0);

    compare.compare(1, 2, descending).should.eql(1);
    compare.compare(2, 1, descending).should.eql(-1);
    compare.compare(1, 1, descending).should.eql(0);
  });

  it('should compare numbers to NaN', function () {
    compare.compare(1, NaN, ascending).should.eql(-1);
    compare.compare(NaN, 1, ascending).should.eql(1);
    compare.compare(NaN, NaN, ascending).should.eql(0);
  });

  it('should compare numbers to NaN so that NaN sort with undefined', function () {
    compare.compare(1, NaN, descending).should.eql(-1);
    compare.compare(NaN, 1, descending).should.eql(1);
    compare.compare(NaN, NaN, descending).should.eql(0);
  });

  it('should compare Infinity', function () {
    compare.compare(1, Infinity, ascending).should.eql(-1);
    compare.compare(Infinity, 1, ascending).should.eql(1);
    compare.compare(Infinity, Infinity, ascending).should.eql(0);

    compare.compare(1, Infinity, descending).should.eql(1);
    compare.compare(Infinity, 1, descending).should.eql(-1);
    compare.compare(Infinity, Infinity, descending).should.eql(0);
  });

  it('should compare -Infinity', function () {
    compare.compare(1, -Infinity, ascending).should.eql(1);
    compare.compare(-Infinity, 1, ascending).should.eql(-1);
    compare.compare(-Infinity, -Infinity, ascending).should.eql(0);

    compare.compare(1, -Infinity, descending).should.eql(-1);
    compare.compare(-Infinity, 1, descending).should.eql(1);
    compare.compare(-Infinity, -Infinity, descending).should.eql(0);
  });

  it('should compare null', function () {
    compare.compare('a', null, ascending).should.eql(-1);
    compare.compare(null, 'a', ascending).should.eql(1);
    compare.compare(null, null, ascending).should.eql(0);
  });

  it('should compare null so that null sort with undefined', function () {
    compare.compare('a', null, descending).should.eql(-1);
    compare.compare(null, 'a', descending).should.eql(1);
    compare.compare(null, null, descending).should.eql(0);
  });

});

describe('compareObjects', function () {

  it('should compare a property on two objects', function () {
    compare.compareObjects({ key: 1 }, { key: 2 }, 'key', ascending).should.eql(-1);
    compare.compareObjects({ key: 2 }, { key: 1 }, 'key', ascending).should.eql(1);
    compare.compareObjects({ key: 1 }, { key: 1 }, 'key', ascending).should.eql(0);

    compare.compareObjects({ key: 1 }, { key: 2 }, 'key', descending).should.eql(1);
    compare.compareObjects({ key: 2 }, { key: 1 }, 'key', descending).should.eql(-1);
    compare.compareObjects({ key: 1 }, { key: 1 }, 'key', descending).should.eql(0);
  });

  it('should treat a missing property as less than an existing property', function () {
    compare.compareObjects({}, { key: 1 }, 'key', ascending).should.eql(1);
    compare.compareObjects({ key: 1 }, {}, 'key', ascending).should.eql(-1);
    compare.compareObjects({}, {}, 'key', ascending).should.eql(0);

    compare.compareObjects({}, { key: 1 }, 'key', descending).should.eql(1);
    compare.compareObjects({ key: 1 }, {}, 'key', descending).should.eql(-1);
    compare.compareObjects({}, {}, 'key', descending).should.eql(0);
  });

  it('should treat null as less than any object', function () {
    compare.compareObjects(null, {}, 'key', ascending).should.eql(1);
    compare.compareObjects({}, null, 'key', ascending).should.eql(-1);
    compare.compareObjects(null, null, 'key', ascending).should.eql(0);

    compare.compareObjects(null, {}, 'key', descending).should.eql(1);
    compare.compareObjects({}, null, 'key', descending).should.eql(-1);
    compare.compareObjects(null, null, 'key', descending).should.eql(0);
  });

});
