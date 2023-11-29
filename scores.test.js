const calculateScore = require('./scores');

describe('calculateScore function', () => {
  test('should calculate the score for a game with all strikes (300 points)', () => {
    expect(calculateScore('XXXXXXXXXXX')).toBe(300);
  });

  test('should calculate the score for a game with all misses (0 points)', () => {
    expect(calculateScore('9-9-9-9-9-9-9-9-9-9-')).toBe(90);
  });

  //failing test
  test('should calculate the score for a game with all spares (150 points)', () => {
    expect(calculateScore('5/5/5/5/5/5/5/5/5/5/5')).toBe(150);
  });

});

