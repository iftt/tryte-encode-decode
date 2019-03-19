# tryte-encode-decode [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![Greenkeeper badge](https://badges.greenkeeper.io/IFTT/tryte-encode-decode.svg)](https://greenkeeper.io/)

[travis-image]: https://travis-ci.org/IFTT/tryte-encode-decode.svg?branch=master
[travis-url]: https://travis-ci.org/IFTT/tryte-encode-decode
[npm-image]: https://img.shields.io/npm/v/@iftt/tryte-encode-decode.svg
[npm-url]: https://npmjs.org/package/@iftt/tryte-encode-decode
[downloads-image]: https://img.shields.io/npm/dm/@iftt/tryte-encode-decode.svg
[downloads-url]: https://npmjs.org/package/@iftt/tryte-encode-decode

## About

Data comes in many shapes and sizes. Storing all data types as strings would be very inefficient in trytes. That is where this module comes in. Whether it be strings, numbers, boolean, arrays, dates, etc. This module aims to encode the data to trytes and also bring it back to it's original type and value.

## Supported Encodings
- [x] String
- [x] 8-bit Integer
- [x] 16-bit Integer
- [x] 32-bit Integer
- [ ] 64-bit Integer
- [x] 8-bit Unsigned Integer
- [x] 16-bit Unsigned Integer
- [x] 32-bit Unsigned Integer
- [ ] 64-bit Unsigned Integer
- [x] Boolean
- [x] DateUTC
- [x] Array<supported>

## Further Reading
[Understanding IOTA Trits & Trytes](https://steemit.com/iota/@wiredcrypto/understanding-iota-trits-and-trytes)

## Install
```sh
# npm
npm install --save tryte-encode-decode

# yarn
yarn add tryte-encode-decode
```

## Example
```js
// import package
// ES5
const tryteConverter = require('@iftt/tryte-encode-decode');
// ES6
import tryteConverter from '@iftt/tryte-encode-decode';

let trytes = tryteConverter.stringToTrytes('This is a test.');
let decodedTrytes = tryteConverter.trytesToString(trytes);

// decodedTrytes === 'This is a test.'
```

---

## API

### stringToTrytes(str?: string): string
* encode string to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.stringToTrytes('This is a test.');

// trytes === 'CCWCXCGDEAXCGDEAPCEAHDTCGDHDSA'
```

### trytesToString(str?: string): string
* decode trytes back to a string
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.stringToTrytes('This is a test.');
let decodedTrytes = tryteConverter.trytesToString(trytes);

// decodedTrytes === 'This is a test.'
```

### dateToTrytes(date?: Date): string
* encode a date to a string
* NOTICE: This uses UTC encoding, so any date below January 1st, 1970 will resolve to the aforementioned date.
* encoded dates are accurate to seconds (not milliseconds)
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let date = new Date('2019-03-18T04:39:00.000Z');
let trytes = tryteConverter.dateToTrytes(date);

// trytes === 'D9F9RH9'
```

### trytesToDate(str?: string): Date
* decode trytes back to a date
* NOTICE: This uses UTC encoding, so any date below January 1st, 1970 will resolve to the aforementioned date.
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let date = new Date('2019-03-18T04:39:00.000Z');
let trytes = tryteConverter.dateToTrytes(date);
let decodedTrytes = tryteConverter.trytesToDate(trytes);

// decodedTrytes === '2019-03-18T04:39:00.000Z'
```

### int8ToTrytes(num?: number): string
* encode 8-bit sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int8ToTrytes(127);

// trytes === 'IL'
```

### trytesToInt8(str?: string): number
* encode 8-bit sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int8ToTrytes(127);
let decodedTrytes = tryteConverter.trytesToInt8(trytes);

// decodedTrytes === 127
```

### uInt8ToTrytes(num?: number): string

### int16ToTrytes(num?: number): string

### trytesToInt16(str?: string): number

### uInt16ToTrytes(num?: number): string

### int32ToTrytes(num?: number): string

### trytesToInt32(str?: string): number

### uInt32ToTrytes(num?: number): string

### trytesToUInt(str?: string): number

### booleanToTryte(bool?: boolean): string

### tryteToBoolean(str?: string): boolean

### type DataTypes (enumerable string)
  * 'string'
  * 'int8'
  * 'uint8'
  * 'int16'
  * 'uint16'
  * 'int32'
  * 'uint32'
  * 'bool'
  * 'date'

### arrayToTrytes(arr?: array<any>, type: DataTypes): string

### trytesToArray(str?: string, type: DataTypes): array<any>

---

## ISC License (ISC)

Copyright 2019 <IFTT>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
