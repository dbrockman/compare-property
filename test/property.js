var should = require('should');
var compare = require('../');

describe('property', function () {

  it('should sort on property', function () {
    var actual = [
      { key: 'a' },
      { key: 's' },
      { key: 'd' },
      { key: 'f' },
      { key: 'g' }
    ];
    var expected = [
      { key: 'a' },
      { key: 'd' },
      { key: 'f' },
      { key: 'g' },
      { key: 's' }
    ];
    var fn = compare.property('key', 1);
    fn.should.be.a.Function;
    actual.sort(fn);
    actual.should.eql(expected);
  });

  it('should sort numeric properties', function () {
    var actual = [
      { key:   1 },
      { key: 612 },
      { key:   9 },
      { key:  24 },
      { key:  69 },
      { key:   1 }
    ];
    var expected = [
      { key:   1 },
      { key:   1 },
      { key:   9 },
      { key:  24 },
      { key:  69 },
      { key: 612 }
    ];
    actual.sort(compare.property('key', 1));
    actual.should.eql(expected);
  });

  it('should sort in descending order if second arg is -1', function () {
    var actual = [
      { key:   1 },
      { key: 612 },
      { key:   9 },
      { key:  24 },
      { key:  69 },
      { key:   1 }
    ];
    var expected = [
      { key: 612 },
      { key:  69 },
      { key:  24 },
      { key:   9 },
      { key:   1 },
      { key:   1 }
    ];
    actual.sort(compare.property('key', -1));
    actual.should.eql(expected);
  });

  it('should default sort order to ascending', function () {
    var actual = [
      { key: 'a' },
      { key: 's' },
      { key: 'd' },
      { key: 'f' },
      { key: 'g' }
    ];
    var expected = [
      { key: 'a' },
      { key: 'd' },
      { key: 'f' },
      { key: 'g' },
      { key: 's' }
    ];
    actual.sort(compare.property('key'));
    actual.should.eql(expected);
  });

  it('should treat null and missing properties as less than existing properties', function () {
    var actual = [{ key: 'a' }, { other: 'b' }, null, { key: 'c' }, null, { other: 'd' }];
    var expected = [null, null, { other: 'b' }, { other: 'd' }, { key: 'a' }, { key: 'c' }];
    actual.sort(compare.property('key'));
    actual.should.eql(expected);
  });

});
