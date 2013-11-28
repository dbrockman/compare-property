var should = require('should');
var compare = require('../');

describe('ascending', function () {

  it('should sort in ascending order', function () {
    var a = ['a', 's', 'd', 'f', 'g'];
    a.sort(compare.ascending);
    a.should.eql(['a', 'd', 'f', 'g', 's']);
  });

  it('should sort numbers in ascending order', function () {
    var a = [1, 612, 9, 24, 69, 1];
    a.sort(compare.ascending);
    a.should.eql([1, 1, 9, 24, 69, 612]);
  });

});
