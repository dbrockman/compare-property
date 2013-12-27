var should = require('should');
var compare = require('../');

describe('descending', function () {

  it('should sort in descending order', function () {
    var a = ['a', 's', 'd', 'f', 'g'];
    a.sort(compare.descending);
    a.should.eql(['s', 'g', 'f', 'd', 'a']);
  });

  it('should sort null and undefined to the end of the array', function () {
    var a = [undefined, 'a', null, 's', null, 'd', 'f', 'g'];
    a.sort(compare.descending);
    a.should.eql(['s', 'g', 'f', 'd', 'a', null, null, undefined]);
  });

  it('should sort numbers in descending order', function () {
    var a = [1, 612, 9, 24, 69, 1];
    a.sort(compare.descending);
    a.should.eql([612, 69, 24, 9, 1, 1]);
  });

});

describe('descendingIgnoreCase', function () {

  it('should sort in ascending order and ignore case', function () {
    var a = ['a', 'S', 'd', 'F', 'g'];
    a.sort(compare.descendingIgnoreCase);
    a.should.eql(['S', 'g', 'F', 'd', 'a']);
  });

  it('should sort null and undefined to the end of the array', function () {
    var a = ['a', null, 'S', undefined, null, 'd', 'F', 'g'];
    a.sort(compare.descendingIgnoreCase);
    a.should.eql(['S', 'g', 'F', 'd', 'a', null, null, undefined]);
  });

});
