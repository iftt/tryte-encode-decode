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
- [x] 8-bit Integer [-128 to 127]
- [x] 16-bit Integer [-32,768 to 32,767]
- [x] 32-bit Integer [-2,147,483,648 to 2,147,483,647]
- [ ] 64-bit Integer
- [x] 8-bit Unsigned Integer [0 to 255]
- [x] 16-bit Unsigned Integer [0 to 65,535]
- [x] 32-bit Unsigned Integer [0 to 4,294,967,295]
- [ ] 64-bit Unsigned Integer
- [x] Boolean
- [x] DateUTC
- [x] Geospatial Coordinates
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

- [stringToTrytes](#stringToTrytes)
- [trytesToString](#trytesToString)
- [dateToTrytes](#dateToTrytes)
- [trytesToDate](#trytesToDate)
- [int8ToTrytes](#int8ToTrytes)
- [trytesToInt8](#trytesToInt8)
- [uInt8ToTrytes](#uInt8ToTrytes)
- [int16ToTrytes](#int16ToTrytes)
- [trytesToInt16](#trytesToInt16)
- [uInt16ToTrytes](#uInt16ToTrytes)
- [int32ToTrytes](#int32ToTrytes)
- [trytesToInt32](#trytesToInt32)
- [uInt32ToTrytes](#uInt32ToTrytes)
- [trytesToUInt](#trytesToUInt)
- [booleanToTryte](#booleanToTryte)
- [tryteToBoolean](#tryteToBoolean)
- [geoToTrytes](#geoToTrytes)
- [trytesToGeo](#trytesToGeo)
- [type DataTypes](#type-DataTypes)
- [arrayToTrytes](#arrayToTrytes)
- [trytesToArray](#trytesToArray)

### stringToTrytes
`stringToTrytes(str?: string): string` [2 trytes per character]
* encode string to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.stringToTrytes('This is a test.');

// trytes === 'CCWCXCGDEAXCGDEAPCEAHDTCGDHDSA'
```

---

### trytesToString
`trytesToString(str?: string): string`
* decode trytes back to a string
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.stringToTrytes('This is a test.');
let decodedTrytes = tryteConverter.trytesToString(trytes);

// decodedTrytes === 'This is a test.'
```

---

### dateToTrytes
`dateToTrytes(date?: Date): string` [7 trytes]
* encode a date to a string
* NOTICE: This uses UTC encoding, so any date below January 1st, 1970 will resolve to the aforementioned date.
* encoded dates are accurate to seconds (not milliseconds)
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let date = new Date('2019-03-18T04:39:00.000Z');
let trytes = tryteConverter.dateToTrytes(date);

// trytes === 'D9F9RH9'
```

---

### trytesToDate
`trytesToDate(str?: string): Date`
* decode trytes back to a date
* NOTICE: This uses UTC encoding, so any date below January 1st, 1970 will resolve to the aforementioned date.
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let date = new Date('2019-03-18T04:39:00.000Z');
let trytes = tryteConverter.dateToTrytes(date);
let decodedTrytes = tryteConverter.trytesToDate(trytes);

// decodedTrytes === '2019-03-18T04:39:00.000Z'
```

---

### int8ToTrytes
`int8ToTrytes(num?: number): string` [2 trytes]
* encode 8-bit sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int8ToTrytes(127);

// trytes === 'IL'
```

---

### trytesToInt8
`trytesToInt8(str?: string): number`
* decode trytes to 8-bit sized numbers
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int8ToTrytes(127);
let decodedTrytes = tryteConverter.trytesToInt8(trytes);

// decodedTrytes === 127
```

---

### uInt8ToTrytes
`uInt8ToTrytes(num?: number): string` [2 trytes]
* encode 8-bit unsigned sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.uInt8ToTrytes(255);

// trytes === 'IL'
```

---

### int16ToTrytes
`int16ToTrytes(num?: number): string` [4 trytes]
* encode 16-bit sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int16ToTrytes(32767);

// trytes === 'CHXF'
```

---

### trytesToInt16
`trytesToInt16(str?: string): number`
* decode trytes to 16-bit sized numbers
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int16ToTrytes(32767);
let decodedTrytes = tryteConverter.trytesToInt16(trytes);

// decodedTrytes === 32767
```

---

### uInt16ToTrytes
`uInt16ToTrytes(num?: number): string` [4 trytes]
* encode 16-bit unsigned sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.uInt16ToTrytes(65535);

// trytes === 'CHXF'
```

---

### int32ToTrytes
`int32ToTrytes(num?: number): string` [7 trytes]
* encode 32-bit sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int32ToTrytes(2147483647);

// trytes === 'KBHSYMU'
```

---

### trytesToInt32
`trytesToInt32(str?: string): number`
* decode trytes to 32-bit sized numbers
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.int32ToTrytes(2147483647);
let decodedTrytes = tryteConverter.trytesToInt32(trytes);

// decodedTrytes === 2147483647
```

---

### uInt32ToTrytes
`uInt32ToTrytes(num?: number): string` [7 trytes]
* encode 32-bit unsigned sized numbers to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.uInt32ToTrytes(4294967295);

// trytes === 'KBHSYMU'
```

---

### trytesToUInt
`trytesToUInt(str?: string): number`
* decode trytes to any sized unsigned number
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.uInt32ToTrytes(4294967295);
let decodedTrytes = tryteConverter.trytesToUInt(trytes);

// decodedTrytes === 4294967295
```

---

### booleanToTryte
`booleanToTryte(bool?: boolean): string` [1 tryte]
* encode a boolean value to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.booleanToTryte(false);

// trytes === '9'
```

---

### tryteToBoolean
`tryteToBoolean(str?: string): boolean`
* decode a tryte to a boolean value
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let trytes = tryteConverter.booleanToTryte(false);
let decodedTrytes = tryteConverter.tryteToBoolean(trytes);

// decodedTrytes === false
```

---

### geoToTrytes
`geoToTrytes(geo: { lat: number, lon: number }): string`
* encode geospatial coordinates to trytes
```js
let trytes = tryteConverter.geoToTrytes({ lat: 52.529562, lon: 13.413047 });

// trytes === 'NPHTQORL9XKP'
```

---

### trytesToGeo
`trytesToGeo(trytes: string): { lat: number, lon: number }`
* decode trytes to geospatial coordinates
```js
let trytes = tryteConverter.geoToTrytes({ lat: 52.529562, lon: 13.413047 });
let decodedTrytes = tryteConverter.trytesToGeo(trytes);

// decodedTrytes === { lat: 52.52956250000001, lon : 13.413046874999981 }
```

---

### type DataTypes
`enumerable string`
* 'string' | 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'bool' | 'date'

---

### arrayToTrytes
`arrayToTrytes(arr?: array<any>, type: DataTypes): string` [2 trytes arraySize + arraySize * type encoding size]
* encode an array of values to trytes
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let array = ['a', 'b', 'c', 'd', 'e'];
let trytes = tryteConverter.arrayToTrytes(array, 'string');

// trytes === '9E999BPC999BQC999BRC999BSC999BTC'
```

---

### trytesToArray
`trytesToArray(str?: string, type: DataTypes): array<any>`
* decode trytes to an array of values
```js
const tryteConverter = require('@iftt/tryte-encode-decode');

let array = ['a', 'b', 'c', 'd', 'e'];
let trytes = tryteConverter.arrayToTrytes(array, 'string');
let decodedTrytes = tryteConverter.trytesToArray(trytes, 'string');

// decodedTrytes === ['a', 'b', 'c', 'd', 'e']
```


---

## ISC License (ISC)

Copyright 2019 <IFTT>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
