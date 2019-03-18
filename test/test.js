const test           = require('tape');
const tryteConverter = require('../lib');

test('test encoding and decoding a string', function (t) {
  t.plan(4);

  // standard string
  let trytes = tryteConverter.stringToTrytes('This is a test.');
  let decodedTrytes = tryteConverter.trytesToString(trytes);

  t.equal(trytes, 'CCWCXCGDEAXCGDEAPCEAHDTCGDHDSA');
  t.equal(decodedTrytes, 'This is a test.');

  // not a string
  trytes = tryteConverter.stringToTrytes(null);
  decodedTrytes = tryteConverter.trytesToString(trytes);

  t.equal(trytes, '');
  t.equal(decodedTrytes, '');
});

test('test encoding and decoding a date', function (t) {
  t.plan(5);

  // standard date
  // NOTE: new Date() will never return the exact same because the DTC value is rounded up from milliseconds to seconds, thus there will be a slight discrepency
  let date = new Date('2019-03-18T04:39:00.000Z');
  let trytes = tryteConverter.dateToTrytes(date);
  let decodedTrytes = tryteConverter.trytesToDate(trytes);

  t.equal(trytes, 'D9F9RH9');
  t.equal(date.toDateString(), decodedTrytes.toDateString());

  // no specified date
  date = new Date();
  trytes = tryteConverter.dateToTrytes(date);
  decodedTrytes = tryteConverter.trytesToDate(trytes);

  // t.equal(trytes, 'D9FCFRLLGRTQ'); this value will be consistantly changing
  t.equal(date.toDateString(), decodedTrytes.toDateString());

  // starting utc date
  date = new Date(0);
  trytes = tryteConverter.dateToTrytes(date);
  decodedTrytes = tryteConverter.trytesToDate(trytes);

  t.equal(trytes, '9999999');
  t.equal(date.toDateString(), decodedTrytes.toDateString());
});

test('test encoding and decoding an 8 bit integer', function (t) {
  t.plan(12);

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

  // not a number
  trytes = tryteConverter.int8ToTrytes(null);
  decodedTrytes = tryteConverter.trytesToInt8(trytes);

  t.equal(trytes, 'DT');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, 0);
});

test('test encoding and decoding an 16 bit integer', function (t) {
  t.plan(12);

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

  // Not a number
  trytes = tryteConverter.int16ToTrytes(null);
  decodedTrytes = tryteConverter.trytesToInt16(trytes);

  t.equal(trytes, 'AQYQ');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, 0);
});

test('test encoding and decoding an 32 bit integer', function (t) {
  t.plan(12);

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

  // Not a number
  trytes = tryteConverter.int32ToTrytes(null);
  decodedTrytes = tryteConverter.trytesToInt32(trytes);

  t.equal(trytes, 'ENQWLTK');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, 0);
});

test('test encoding and decoding an 8 bit unsigned integer', function (t) {
  t.plan(9);

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

  // Not a number
  trytes = tryteConverter.uInt8ToTrytes(null);
  decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(decodedTrytes, 0);
});

test('test encoding and decoding an 16 bit unsigned integer', function (t) {
  t.plan(9);

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

  // Not a number
  trytes = tryteConverter.uInt16ToTrytes(0);
  decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, '9999');
  t.equal(trytes.length, 4);
  t.equal(decodedTrytes, 0);
});

test('test encoding and decoding an 32 bit unsigned integer', function (t) {
  t.plan(9);

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

  // Not a number
  trytes = tryteConverter.uInt32ToTrytes(0);
  decodedTrytes = tryteConverter.trytesToUInt(trytes);

  t.equal(trytes, '9999999');
  t.equal(trytes.length, 7);
  t.equal(decodedTrytes, 0);
});

test('test encoding and decoding a boolean value', function (t) {
  t.plan(9);

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

  // Not a boolean
  trytes = tryteConverter.booleanToTryte(null);
  decodedTrytes = tryteConverter.tryteToBoolean(trytes);

  t.equal(trytes, '9');
  t.equal(trytes.length, 1);
  t.equal(decodedTrytes, false);
});

test('test encoding and decoding an array of 8 bit integers', function (t) {
  t.plan(9);

  // Standard number array
  let array = [-128, 0, 1, 2, 127];
  let trytes = tryteConverter.arrayToTrytes(array, 'int8');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'int8');

  t.equal(trytes, '9E99DTDUDVIL');
  t.equal(trytes.length, 12);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));

  // Empty array
  array = [];
  trytes = tryteConverter.arrayToTrytes(array, 'int8');
  decodedTrytes = tryteConverter.trytesToArray(trytes, 'int8');

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));

  // Not an array
  array = null;
  trytes = tryteConverter.arrayToTrytes(array, 'int8');
  decodedTrytes = tryteConverter.trytesToArray(trytes, 'int8');

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(JSON.stringify([]), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of 16 bit integers', function (t) {
  t.plan(3);

  // Standard number array
  let array = [-32768, 1, 2, 3, 32767];
  let trytes = tryteConverter.arrayToTrytes(array, 'int16');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'int16');

  t.equal(trytes, '9E9999AQYRAQYSAQYTCHXF');
  t.equal(trytes.length, 22);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of 32 bit integers', function (t) {
  t.plan(3);

  // Standard number array
  let array = [-2147483648, 1, 2, 3, 2147483647];
  let trytes = tryteConverter.arrayToTrytes(array, 'int32');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'int32');

  t.equal(trytes, '9E9999999ENQWLTLENQWLTMENQWLTNKBHSYMU');
  t.equal(trytes.length, 37);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of 8 bit unsigned integers', function (t) {
  t.plan(6);

  // Standard number array
  let array = [0, 1, 2, 3, 255];
  let trytes = tryteConverter.arrayToTrytes(array, 'uint8');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'uint8');

  t.equal(trytes, '9E999A9B9CIL');
  t.equal(trytes.length, 12);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));

  // Empty array
  array = [];
  trytes = tryteConverter.arrayToTrytes(array, 'uint8');
  decodedTrytes = tryteConverter.trytesToArray(trytes, 'uint8');

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of 16 bit unsigned integers', function (t) {
  t.plan(3);

  // Standard number array
  let array = [0, 1, 2, 3, 65535];
  let trytes = tryteConverter.arrayToTrytes(array, 'uint16');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'uint16');

  t.equal(trytes, '9E9999999A999B999CCHXF');
  t.equal(trytes.length, 22);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of 32 bit unsigned integers', function (t) {
  t.plan(3);

  // Standard number array
  let array = [0, 1, 2, 3, 4294967295];
  let trytes = tryteConverter.arrayToTrytes(array, 'uint32');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'uint32');

  t.equal(trytes, '9E9999999999999A999999B999999CKBHSYMU');
  t.equal(trytes.length, 37);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of boolean values', function (t) {
  t.plan(3);

  // Standard boolean array
  let array = [false, true, false, false, true];
  let trytes = tryteConverter.arrayToTrytes(array, 'bool');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'bool');

  t.equal(trytes, '9E9A99A');
  t.equal(trytes.length, 7);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of boolean values', function (t) {
  t.plan(3);

  // Standard date array
  // NOTE: new Date() will never return the exact same because the DTC value is rounded up from milliseconds to seconds, thus there will be a slight discrepency
  let array = [new Date(0), new Date('2019-03-18T04:39:00.000Z'), new Date('2019-03-18T04:38:00.000Z'), new Date(5000), new Date(2018, 11, 24, 10, 33, 30, 0)];
  let trytes = tryteConverter.arrayToTrytes(array, 'date');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'date');

  t.equal(trytes, '9E9999999D9F9RH9D9F9REU999999ECZSLHMC');
  t.equal(trytes.length, 37);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});

test('test encoding and decoding an array of strings', function (t) {
  t.plan(9);

  // Standard string array
  let array = ['a', 'b', 'c', 'd', 'e'];
  let trytes = tryteConverter.arrayToTrytes(array, 'string');
  let decodedTrytes = tryteConverter.trytesToArray(trytes, 'string');

  t.equal(trytes, '9E999BPC999BQC999BRC999BSC999BTC');
  t.equal(trytes.length, 32);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));

  array = [];
  trytes = tryteConverter.arrayToTrytes(array, 'string');
  decodedTrytes = tryteConverter.trytesToArray(trytes, 'string');

  t.equal(trytes, '99');
  t.equal(trytes.length, 2);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));

  array = ['This is a bigger string!', 'This is another big string...'];
  trytes = tryteConverter.arrayToTrytes(array, 'string');
  decodedTrytes = tryteConverter.trytesToArray(trytes, 'string');

  t.equal(trytes, '9B99AUCCWCXCGDEAXCGDEAPCEAQCXCVCVCTCFDEAGDHDFDXCBDVCFA99BDCCWCXCGDEAXCGDEAPCBDCDHDWCTCFDEAQCXCVCEAGDHDFDXCBDVCSASASA');
  t.equal(trytes.length, 116);
  t.equal(JSON.stringify(array), JSON.stringify(decodedTrytes));
});
