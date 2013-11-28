var should = require('should');
var compare = require('../');

describe('descending', function () {

  it('should sort in descending order', function () {
    var a = ['a', 's', 'd', 'f', 'g'];
    a.sort(compare.descending);
    a.should.eql(['s', 'g', 'f', 'd', 'a']);
  });

  it('should sort numbers in descending order', function () {
    var a = [1, 612, 9, 24, 69, 1];
    a.sort(compare.descending);
    a.should.eql([612, 69, 24, 9, 1, 1]);
  });

});
