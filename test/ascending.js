var should = require('should');
var compare = require('../');

describe('ascending', function () {

  it('should sort in ascending order', function () {
    var a = ['a', 's', 'd', 'f', 'g'];
    a.sort(compare.ascending);
    a.should.eql(['a', 'd', 'f', 'g', 's']);
  });

  it('should sort null and undefined to the end of the array', function () {
    var a = [undefined, 'a', null, 's', null, 'd', 'f', 'g'];
    a.sort(compare.ascending);
    a.should.eql(['a', 'd', 'f', 'g', 's', null, null, undefined]);
  });

  it('should sort numbers in ascending order', function () {
    var a = [1, 612, 9, 24, 69, 1];
    a.sort(compare.ascending);
    a.should.eql([1, 1, 9, 24, 69, 612]);
  });

});

describe('ascendingIgnoreCase', function () {

  it('should sort in ascending order and ignore case', function () {
    var a = ['a', 'S', 'd', 'F', 'g'];
    a.sort(compare.ascendingIgnoreCase);
    a.should.eql(['a', 'd', 'F', 'g', 'S']);
  });

  it('should sort null and undefined to the end of the array', function () {
    var a = ['a', null, 'S', undefined, null, 'd', 'F', 'g'];
    a.sort(compare.ascendingIgnoreCase);
    a.should.eql(['a', 'd', 'F', 'g', 'S', null, null, undefined]);
  });

});
