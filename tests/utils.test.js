const { italic } = require('chalk');
const { description } = require('commander');
const { getFileExtension, isNotEmpty } = require('../utils');

describe('getFileExtension', () => {
  it("returns `null` if there's no match", () => {
    expect(getFileExtension('filename-without-extension')).toBeNull();
  });

  it('it correctly returns a file extension for `test.js`', () => {
    expect(getFileExtension('test.js')).toBe('.js');
  });

  it('it correctly returns a file extension for `test.spec.js`', () => {
    expect(getFileExtension('test.spec.js')).toBe('.js');
  });

  it('it correctly returns a file extension for `test.js?test=true`', () => {
    expect(getFileExtension('test.js?test=true')).toBe('.js');
  });

  it('it correctly returns a file extension for `test.js#test`', () => {
    expect(getFileExtension('test.js?test=true')).toBe('.js');
  });
});

describe('isNotEmpty', () => {
  it('rejects string containing only whitespace characters', () => {
    expect(isNotEmpty('\n      ')).toBeFalsy();
  });

  it('accepts a string containing whitespace characters and non-whitespace characters', () => {
    expect(isNotEmpty('\n      test')).toBeTruthy();
    expect(isNotEmpty('test\n      ')).toBeTruthy();
  });

  it("accepts a string that doesn't contain whitespace characters", () => {
    expect(isNotEmpty('test')).toBeTruthy();
  });
});
