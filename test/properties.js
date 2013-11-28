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

  it('should treat null and missing properties as less than existing properties', function () {
    var actual = [
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 },
      { a: 2 },
      null
    ];
    var expected = [
      null,
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 },
      { a: 2 }
    ];
    var fn = compare.properties({ a: 1, b: -1 });
    actual.sort(fn);
    actual.should.eql(expected);
  });

});
