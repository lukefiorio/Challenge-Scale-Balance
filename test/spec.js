// write tests here
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
var scaleBalance = require('../index.js');

describe('Input', function() {
  it('should throw an error if weights are not in an array', function() {
    expect(function() {
      scaleBalance('[2, 4], [6, 8]');
    }).to.throw('Not an array!');
  });

  it('should throw an error if strArr does not contain 2 elements', function() {
    expect(function() {
      scaleBalance(['[2, 5], [3, 4, 6]']);
    }).to.throw('Needs to have 2 elements!');
  });

  it('should throw an error if either element is not stored as string', function() {
    expect(function() {
      scaleBalance([[2, 4], [6, 8]]);
    }).to.throw('Needs to be an array of strings!');
  });

  it('should throw an error if 1st element does not have two values', function() {
    expect(function() {
      scaleBalance(['[2]', '[1, 4, 6, 7]']);
    }).to.throw('1st element must have two values!');
  });

  it('should throw an error if scale is not positive integers', function() {
    expect(function() {
      scaleBalance(['[2, -4]', '[1, 5, 8]']);
    }).to.throw('All values need to be positive integers!');
  });

  it('should throw an error if 2nd element is empty', function() {
    expect(function() {
      scaleBalance(['[2, 4]', '[]']);
    }).to.throw('2nd element cannot be empty!');
  });

  it('should throw an error if weights are not positive integers', function() {
    expect(function() {
      scaleBalance(['[2, 4]', '[1, 5, -8]']);
    }).to.throw('All values need to be positive integers!');
  });
});

describe('Output', function() {
  it(`should return "Not possible" if no solution`, function() {
    let input = ['[1, 9]', '[3, 4, 2]'];
    let results = scaleBalance(input);
    expect(results).to.equal('Not possible');
  });

  it('should add two weights to single side if necessary', function() {
    let input = ['[1, 9]', '[3, 5, 2]'];
    let results = scaleBalance(input);
    expect(results).to.equal('3,5');
  });

  it('should always use single weight when possible', function() {
    let input = ['[1, 5]', '[2, 6, 4]'];
    let results = scaleBalance(input);
    expect(results).to.equal('0,4');
  });

  it('should sort returned weights in ascending order', function() {
    let input = ['[1, 9]', '[5, 3, 2]'];
    let results = scaleBalance(input);
    expect(results).to.equal('3,5');
  });
});
