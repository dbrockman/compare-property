var should = require('should');
var compare = require('../');

var ascending = 1;
var descending = -1;

describe('compare', function () {

  it('should compare a property on two objects', function () {
    compare.compare({ key: 1 }, { key: 2 }, 'key', ascending).should.eql(-1);
    compare.compare({ key: 2 }, { key: 1 }, 'key', ascending).should.eql(1);
    compare.compare({ key: 1 }, { key: 1 }, 'key', ascending).should.eql(0);

    compare.compare({ key: 1 }, { key: 2 }, 'key', descending).should.eql(1);
    compare.compare({ key: 2 }, { key: 1 }, 'key', descending).should.eql(-1);
    compare.compare({ key: 1 }, { key: 1 }, 'key', descending).should.eql(0);
  });

  it('should treat a missing property as less than an existing property', function () {
    compare.compare({}, { key: 1 }, 'key', ascending).should.eql(-1);
    compare.compare({ key: 1 }, {}, 'key', ascending).should.eql(1);
    compare.compare({}, {}, 'key', ascending).should.eql(0);

    compare.compare({}, { key: 1 }, 'key', descending).should.eql(1);
    compare.compare({ key: 1 }, {}, 'key', descending).should.eql(-1);
    compare.compare({}, {}, 'key', descending).should.eql(0);
  });

  it('should treat null as less than any object', function () {
    compare.compare(null, {}, 'key', ascending).should.eql(-1);
    compare.compare({}, null, 'key', ascending).should.eql(1);
    compare.compare(null, null, 'key', ascending).should.eql(0);

    compare.compare(null, {}, 'key', descending).should.eql(1);
    compare.compare({}, null, 'key', descending).should.eql(-1);
    compare.compare(null, null, 'key', descending).should.eql(0);
  });

});
