// @flow
const iotaAreaCodes = require('@iota/area-codes')
const debug = require('debug')('tryte-encode-decode')
// Number type ranges: https://docs.microsoft.com/en-us/cpp/cpp/data-type-ranges?view=vs-2017
export const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export const TRYTE_TO_DEFAULT = { '9': '0', 'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6', 'G': '7', 'H': '8', 'I': '9', 'J': 'a', 'K': 'b', 'L': 'c', 'M': 'd', 'N': 'e', 'O': 'f', 'P': 'g', 'Q': 'h', 'R': 'i', 'S': 'j', 'T': 'k', 'U': 'l', 'V': 'm', 'W': 'n', 'X': 'o', 'Y': 'p', 'Z': 'q' }
export const typesizes = { int8: 2, uint8: 2, int16: 4, uint16: 4, int32: 7, uint32: 7, bool: 1, date: 7, geo: 12 }

export type DataTypes = 'string' | 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'bool' | 'date' | 'geo';

export function stringToTrytes (input: string): string {
  debug('stringToTrytes')
  if (typeof input !== 'string') { return '' } // soft failure

  let trytes = ''

  for (let i = 0; i < input.length; i++) {
    let asciiValue = input[i].charCodeAt(0)

    // If not recognizable ASCII character, return null
    if (asciiValue > 255) { return '' }

    let firstValue = asciiValue % 27
    let secondValue = (asciiValue - firstValue) / 27
    let trytesValue = TRYTE_ALPHABET[firstValue] + TRYTE_ALPHABET[secondValue]

    trytes += trytesValue
  }

  return trytes
}

export function trytesToString (inputTrytes: string): string {
  debug('trytesToString')
  if (typeof inputTrytes !== 'string' || inputTrytes.length % 2) { return '' } // soft failure

  let outputString = ''

  for (let i = 0; i < inputTrytes.length; i += 2) {
    // Get a trytes pair
    let trytes = inputTrytes[i] + inputTrytes[i + 1]

    let firstValue = TRYTE_ALPHABET.indexOf(trytes[0])
    let secondValue = TRYTE_ALPHABET.indexOf(trytes[1])

    let decimalValue = firstValue + secondValue * 27
    let character = String.fromCharCode(decimalValue)

    outputString += character
  }

  return outputString
}

export function dateToTrytes (date: Date): string {
  debug('dateToTrytes')
  if (typeof date !== 'object' || typeof date.getMonth !== 'function') { return '9999999' }
  // Convert date to UTC (seconds) and convert with uInt32ToTrytes
  let utcSeconds = Math.round(date.getTime() / 1000) // convert from milliseconds to seconds to fit in a 32 bit uint
  if (utcSeconds < 0) { utcSeconds = 0 } // soft failure

  return uInt32ToTrytes(utcSeconds)
}

export function trytesToDate (trytes: string): Date {
  debug('trytesToDate')
  if (typeof trytes !== 'string') { return new Date(0) } // soft failure
  let utcSeconds = trytesToUInt(trytes)
  let date = new Date(0)
  date.setUTCSeconds(utcSeconds)

  return date
}

export function int8ToTrytes (int: number | null): string {
  debug('int8ToTrytes')
  if (typeof int !== 'number') { int = 0 } // soft failure
  // -128 to 127 (256 total) - 2 Trytes
  // Convert to a non-negative number, convert base, change each value to trytes
  int = int + 128
  let trytes = int.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] })
  while (trytes.length < 2) { trytes.unshift('9') }

  return trytes.join('')
}

export function trytesToInt8 (trytes: string): number {
  debug('trytesToInt8')
  // Convert each tryte to default base array and then parseInt
  let int = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('')

  return parseInt(int, 27) - 128
}

export function uInt8ToTrytes (uint: number): string {
  debug('uInt8ToTrytes')
  if (typeof uint !== 'number') { uint = 0 } // soft failure
  // 0 to 255 (256 total) - 2 Trytes
  // Convert base, change each value to trytes
  let trytes = uint.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] })
  while (trytes.length < 2) { trytes.unshift('9') }

  return trytes.join('')
}

export function int16ToTrytes (int: number): string {
  debug('int16ToTrytes')
  if (typeof int !== 'number') { int = 0 } // soft failure
  // -32,768 to 32,767 (65,536 total) - 4 Trytes
  // Convert to a non-negative number, convert base, change each value to trytes
  int = int + 32768
  let trytes = int.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] })
  while (trytes.length < 4) { trytes.unshift('9') }

  return trytes.join('')
}

export function trytesToInt16 (trytes: string): number {
  debug('trytesToInt16')
  // convert each tryte to default base array and then parseInt
  let int = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('')

  return parseInt(int, 27) - 32768
}

export function uInt16ToTrytes (uint: number): string {
  debug('uInt16ToTrytes')
  if (typeof uint !== 'number') { uint = 0 } // soft failure
  // 0 to 65,535 (65,536 total) - 4 Trytes
  // Convert base, change each value to trytes
  let trytes = uint.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] })
  while (trytes.length < 4) { trytes.unshift('9') }

  return trytes.join('')
}

export function int32ToTrytes (int: number): string {
  debug('int32ToTrytes')
  if (typeof int !== 'number') { int = 0 } // soft failure
  // -2,147,483,648 to 2,147,483,647 (4,294,967,296 total) - 7 Trytes
  // Convert to a non-negative number, convert base, change each value to trytes
  int = int + 2147483648
  let trytes = int.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] })
  while (trytes.length < 7) { trytes.unshift('9') }

  return trytes.join('')
}

export function trytesToInt32 (trytes: string): number {
  debug('trytesToInt32')
  if (typeof trytes !== 'string') { return 0 } // soft failure
  // Convert each tryte to default base array and then parseInt
  let int = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('')

  return parseInt(int, 27) - 2147483648
}

export function uInt32ToTrytes (uint: number): string {
  debug('uInt32ToTrytes')
  if (typeof uint !== 'number') { uint = 0 } // soft failure
  // 0 to 4,294,967,295 (4,294,967,296 total) - 7 Trytes
  // Convert base, change each value to trytes
  let trytes = uint.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] })
  while (trytes.length < 7) { trytes.unshift('9') }

  return trytes.join('')
}

export function trytesToUInt (trytes: string): number {
  debug('trytesToUInt')
  if (typeof trytes !== 'string') { return 0 } // soft failure
  // Convert each tryte to default base array and then parseInt
  let uint = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('')

  return parseInt(uint, 27)
}

export function booleanToTryte (bool: bool): string {
  debug('booleanToTryte')
  if (typeof bool !== 'boolean') { return '9' } // soft failure
  if (bool) { return 'A' } else { return '9' }
}

export function tryteToBoolean (tryte: string): bool {
  debug('tryteToBoolean')
  if (typeof tryte !== 'string') { return false } // soft failure
  if (tryte === 'A') { return true } else { return false }
}

export function geoToTrytes (geo: {lat: number, lon: number}): string {
  debug('geoToTrytes')
  if (!geo || typeof geo !== 'object') { geo = { lat: 0, lon: 0 } }
  if (typeof geo.lat !== 'number') { geo.lat = 0 }
  if (typeof geo.lon !== 'number') { geo.lon = 0 }

  return iotaAreaCodes.encode(geo.lat, geo.lon, 11)
}

export function trytesToGeo (trytes: string): {lat: number, lon: number} {
  debug('trytesToGeo')
  let codeArea = iotaAreaCodes.decode(trytes)

  return { lat: codeArea.latitude, lon: codeArea.longitude }
}

function _getEncoder (type: DataTypes): function {
  debug('_getEncoder')
  if (type === 'string') {
    return (input: string): string => {
      let trytes = stringToTrytes(input) // first convert incase it is not a string
      return uInt16ToTrytes(trytes.length) + trytes
    }
  } else if (type === 'int8') {
    return int8ToTrytes
  } else if (type === 'uint8') {
    return uInt8ToTrytes
  } else if (type === 'int16') {
    return int16ToTrytes
  } else if (type === 'uint16') {
    return uInt16ToTrytes
  } else if (type === 'int32') {
    return int32ToTrytes
  } else if (type === 'uint32') {
    return uInt32ToTrytes
  } else if (type === 'bool') {
    return booleanToTryte
  } else if (type === 'date') {
    return dateToTrytes
  } else if (type === 'geo') {
    return geoToTrytes
  } else {
    return null
  }
}

function _getDecoder (type: DataTypes): [Function, Function] | [number, Function] {
  debug('_getDecoder')
  if (type === 'string') {
    return [
      (trytes: string, startingIndex: number): number => {
        return trytesToUInt(trytes.slice(startingIndex, startingIndex + 4))
      },
      trytesToString
    ]
  } else if (type === 'int8') {
    return [2, trytesToInt8]
  } else if (type === 'uint8') {
    return [2, trytesToUInt]
  } else if (type === 'int16') {
    return [4, trytesToInt16]
  } else if (type === 'uint16') {
    return [4, trytesToUInt]
  } else if (type === 'int32') {
    return [7, trytesToInt32]
  } else if (type === 'uint32') {
    return [7, trytesToUInt]
  } else if (type === 'bool') {
    return [1, tryteToBoolean]
  } else if (type === 'date') {
    return [7, trytesToDate]
  } else if (type === 'geo') {
    return [12, trytesToGeo]
  } else {
    return [null, null]
  }
}

export function arrayToTrytes (array: Array<any>, type: DataTypes): string {
  debug('arrayToTrytes')
  if (!Array.isArray(array)) { return '99' } // soft failure
  // First get the proper function from the type, If type is 'string' then also save the length of the string
  let encode = _getEncoder(type)
  // Now break the array down to trytes
  let trytes = uInt8ToTrytes(array.length) // Thus the max array size is 255
  array.forEach(value => { trytes += encode(value) })

  return trytes
}

export function trytesToArray (trytes: string, type: DataTypes): Array<any> {
  debug('trytesToArray')
  // if (typeof type !== DataTypes) // soft failure
  //   return [];
  // First get the proper function from the type, If type is 'string' then the decoder works differently (edge case)
  let [stepSize, decode] = _getDecoder(type)
  let array = []
  let arraySize = trytesToUInt(trytes.slice(0, 2))

  if (type === 'string') {
    let startingIndex = 2
    while (arraySize--) {
      // get size of string
      let stringSize = stepSize(trytes, startingIndex)
      startingIndex += 4 // increment index from size
      array.push(decode(trytes.slice(startingIndex, startingIndex + stringSize)))
      startingIndex += stringSize
    }
  } else {
    let tryteSize = typesizes[type] * arraySize + 2
    for (let i = 2; i < tryteSize; i += stepSize) { array.push(decode(trytes.slice(i, i + stepSize))) }
  }

  return array
}

export default {
  stringToTrytes,
  trytesToString,
  dateToTrytes,
  trytesToDate,
  int8ToTrytes,
  trytesToInt8,
  uInt8ToTrytes,
  int16ToTrytes,
  trytesToInt16,
  uInt16ToTrytes,
  int32ToTrytes,
  trytesToInt32,
  uInt32ToTrytes,
  trytesToUInt,
  booleanToTryte,
  tryteToBoolean,
  geoToTrytes,
  trytesToGeo,
  arrayToTrytes,
  trytesToArray
}
