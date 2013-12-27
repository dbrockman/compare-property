var should = require('should');
var compare = require('../');

describe('properties', function () {

  it('should sort on multiple properties', function () {
    var actual = [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 }
    ];
    var expected = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ];
    var fn = compare.properties({ a: 1, b: -1 });
    fn.should.be.a.Function;
    actual.sort(fn);
    actual.should.eql(expected);
  });

  it('should sort null and missing properties to the end of the array', function () {
    var actual = [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 },
      { a: 2 },
      null
    ];
    var expected = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 2 },
      null
    ];
    var fn = compare.properties({ a: 1, b: -1 });
    actual.sort(fn);
    actual.should.eql(expected);
  });

  it('should ignore case on all properties if ignoreCase is true', function () {
    var actual = [
      { a: 'c', b: 'C' },
      { a: 'c', b: 'd' },
      { a: 'D', b: 'c' },
      { a: 'd', b: 'd' }
    ];
    var expected = [
      { a: 'c', b: 'd' },
      { a: 'c', b: 'C' },
      { a: 'd', b: 'd' },
      { a: 'D', b: 'c' }
    ];
    var fn = compare.properties({ a: 1, b: -1 }, true);
    actual.sort(fn);
    actual.should.eql(expected);
  });

  it('should ignore case on some properties if ignoreCase is an array of property names', function () {
    var actual = [
      { a: 'c', b: 'C' },
      { a: 'c', b: 'd' },
      { a: 'D', b: 'c' },
      { a: 'd', b: 'd' }
    ];
    var expected = [
      { a: 'D', b: 'c' },
      { a: 'c', b: 'd' },
      { a: 'c', b: 'C' },
      { a: 'd', b: 'd' }
    ];
    var fn = compare.properties({ a: 1, b: -1 }, ['b']);
    actual.sort(fn);
    actual.should.eql(expected);
  });

  it('should ignore case on some properties if ignoreCase is an object', function () {
    var actual = [
      { a: 'c', b: 'C' },
      { a: 'c', b: 'd' },
      { a: 'D', b: 'c' },
      { a: 'd', b: 'd' }
    ];
    var expected = [
      { a: 'D', b: 'c' },
      { a: 'c', b: 'd' },
      { a: 'c', b: 'C' },
      { a: 'd', b: 'd' }
    ];
    var fn = compare.properties({ a: 1, b: -1 }, { b: true });
    actual.sort(fn);
    actual.should.eql(expected);
  });

});
