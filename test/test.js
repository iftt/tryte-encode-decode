const test           = require('tape');
const tryteConverter = require('../lib');

test('test encoding and decoding a string', function (t) {
  t.plan(2);

  let trytes = tryteConverter.stringToTrytes('This is a test.');
  let decodedTrytes = tryteConverter.trytesToString(trytes);

  t.equal(trytes, 'CCWCXCGDEAXCGDEAPCEAHDTCGDHDSA');
  t.equal(decodedTrytes, 'This is a test.');
});

test('test encoding and decoding an 8 bit integer', function (t) {
  t.plan(9);

  // Zero
  let trytes = tryteConverter.int8ToTrytes(0);
  let decodedTrytes = tryteConverter.trytesToInt8(trytes);

  t.equal(trytes, 'DT');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, 0);

  // Largest Negative number
  trytes = tryteConverter.int8ToTrytes(-128);
  decodedTrytes = tryteConverter.trytesToInt8(trytes);

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, -128);

  // Largest positive number
  trytes = tryteConverter.int8ToTrytes(127);
  decodedTrytes = tryteConverter.trytesToInt8(trytes);

  t.equal(trytes, 'IL');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, 127);
});

test('test encoding and decoding an 16 bit integer', function (t) {
  t.plan(9);

  // Zero
  let trytes = tryteConverter.int16ToTrytes(0);
  let decodedTrytes = tryteConverter.trytesToInt16(trytes);

  t.equal(trytes, 'AQYQ');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, 0);

  // Largest Negative number
  trytes = tryteConverter.int16ToTrytes(-32768);
  decodedTrytes = tryteConverter.trytesToInt16(trytes);

  t.equal(trytes, '9999');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, -32768);

  // Largest positive number
  trytes = tryteConverter.int16ToTrytes(32767);
  decodedTrytes = tryteConverter.trytesToInt16(trytes);

  t.equal(trytes, 'CHXF');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, 32767);
});

test('test encoding and decoding an 32 bit integer', function (t) {
  t.plan(9);

  // Zero
  let trytes = tryteConverter.int32ToTrytes(0);
  let decodedTrytes = tryteConverter.trytesToInt32(trytes);

  t.equal(trytes, 'ENQWLTK');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, 0);

  // Largest Negative number
  trytes = tryteConverter.int32ToTrytes(-2147483648);
  decodedTrytes = tryteConverter.trytesToInt32(trytes);

  t.equal(trytes, '9999999');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, -2147483648);

  // Largest positive number
  trytes = tryteConverter.int32ToTrytes(2147483647);
  decodedTrytes = tryteConverter.trytesToInt32(trytes);

  t.equal(trytes, 'KBHSYMU');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, 2147483647);
});

test('test encoding and decoding an 8 bit unsigned integer', function (t) {
  t.plan(6);

  // Zero
  let trytes = tryteConverter.uInt8ToTrytes(0);
  let decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, 0);

  // Largest positive number
  trytes = tryteConverter.uInt8ToTrytes(255);
  decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, 'IL');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, 255);
});

test('test encoding and decoding an 16 bit unsigned integer', function (t) {
  t.plan(6);

  // Zero
  let trytes = tryteConverter.uInt16ToTrytes(0);
  let decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, '9999');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, 0);

  // Largest positive number
  trytes = tryteConverter.uInt16ToTrytes(65535);
  decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, 'CHXF');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, 65535);
});

test('test encoding and decoding an 32 bit unsigned integer', function (t) {
  t.plan(6);

  // Zero
  let trytes = tryteConverter.uInt32ToTrytes(0);
  let decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, '9999999');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, 0);

  // Largest positive number
  trytes = tryteConverter.uInt32ToTrytes(4294967295);
  decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, 'KBHSYMU');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, 4294967295);
});

test('test encoding and decoding a boolean value', function (t) {
  t.plan(6);

  // False
  let trytes = tryteConverter.booleanToTryte(false);
  let decodedTrytes = tryteConverter.tryteToBoolean(trytes);

  t.equal(trytes, '9');
  t.equal(trytes.length, 1);
  t.equal(decodedTrytes, false);

  // True
  trytes = tryteConverter.booleanToTryte(true);
  decodedTrytes = tryteConverter.tryteToBoolean(trytes);

  t.equal(trytes, 'A');
  t.equal(trytes.length, 1);
  t.equal(decodedTrytes, true);
});
