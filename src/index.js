// @flow
// Number type ranges: https://docs.microsoft.com/en-us/cpp/cpp/data-type-ranges?view=vs-2017
const TRYTE_ALPHABET   = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const TRYTE_TO_DEFAULT = { '9': '0', 'A': '1', 'B': '2', 'C': '3', 'D': '4', 'E': '5', 'F': '6', 'G': '7', 'H': '8', 'I': '9', 'J': 'a', 'K': 'b', 'L': 'c', 'M': 'd', 'N': 'e', 'O': 'f', 'P': 'g', 'Q': 'h', 'R': 'i', 'S': 'j', 'T': 'k', 'U': 'l', 'V': 'm', 'W': 'n', 'X': 'o', 'Y': 'p', 'Z': 'q' };

type DataTypes = 'string' | 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'bool';

export function stringToTrytes(input: string): string {
  if (typeof input !== 'string')
    return null;

  let trytes = '';

  for (let i = 0; i < input.length; i++) {
    let asciiValue = input[i].charCodeAt(0);

    // If not recognizable ASCII character, return null
    if (asciiValue > 255)
      return null;

    let firstValue  = asciiValue % 27;
    let secondValue = (asciiValue - firstValue) / 27;
    let trytesValue = TRYTE_ALPHABET[firstValue] + TRYTE_ALPHABET[secondValue];

    trytes += trytesValue;
  }

  return trytes;
}

export function trytesToString(inputTrytes: string): string {
  if (typeof inputTrytes !== 'string' || inputTrytes.length % 2)
    return null;

  let outputString = '';

  for (let i = 0; i < inputTrytes.length; i += 2) {
    // Get a trytes pair
    let trytes = inputTrytes[i] + inputTrytes[i + 1];

    let firstValue  = TRYTE_ALPHABET.indexOf(trytes[0]);
    let secondValue = TRYTE_ALPHABET.indexOf(trytes[1]);

    let decimalValue = firstValue + secondValue * 27;
    let character    = String.fromCharCode(decimalValue);

    outputString += character;
  }

  return outputString;
}

export function int8ToTrytes(int: number): string {
  // -128 to 127 (256 total) - 2 Trytes
  // Convert to a non-negative number, convert base, change each value to trytes
  int = int + 128;
  let trytes = int.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] });
  while (trytes.length < 2)
    trytes.unshift('9');
  return trytes.join('');
}

export function trytesToInt8(trytes: string): number {
  // Convert each tryte to default base array and then parseInt
  let int = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('');

  return parseInt(int, 27) - 128;
}

export function uInt8ToTrytes(uint: number): string {
  // 0 to 255 (256 total) - 2 Trytes
  // Convert base, change each value to trytes
  let trytes = uint.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] });
  while (trytes.length < 2)
    trytes.unshift('9');
  return trytes.join('');
}

export function int16ToTrytes(int: number): string {
  // -32,768 to 32,767 (65,536 total) - 4 Trytes
  // Convert to a non-negative number, convert base, change each value to trytes
  int = int + 32768;
  let trytes = int.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] });
  while (trytes.length < 4)
    trytes.unshift('9');
  return trytes.join('');
}

export function trytesToInt16(trytes: string): number {
  // convert each tryte to default base array and then parseInt
  let int = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('');

  return parseInt(int, 27) - 32768;
}

export function uInt16ToTrytes(uint: number): string {
  // 0 to 65,535 (65,536 total) - 4 Trytes
  // Convert base, change each value to trytes
  let trytes = uint.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] });
  while (trytes.length < 4)
    trytes.unshift('9');
  return trytes.join('');
}

export function int32ToTrytes(int: number): string {
  // -2,147,483,648 to 2,147,483,647 (4,294,967,296 total) - 7 Trytes
  // Convert to a non-negative number, convert base, change each value to trytes
  int = int + 2147483648;
  let trytes = int.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] });
  while (trytes.length < 7)
    trytes.unshift('9');
  return trytes.join('');
}

export function trytesToInt32(trytes: string): number {
  // Convert each tryte to default base array and then parseInt
  let int = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('');

  return parseInt(int, 27) - 2147483648;
}

export function uInt32ToTrytes(uint: number): string {
  // 0 to 4,294,967,295 (4,294,967,296 total) - 7 Trytes
  // Convert base, change each value to trytes
  let trytes = uint.toString(27).split('').map(d => { return TRYTE_ALPHABET[ parseInt(d, 27) ] });
  while (trytes.length < 7)
    trytes.unshift('9');
  return trytes.join('');
}

export function trytesToUInt(trytes: string): number {
  // Convert each tryte to default base array and then parseInt
  let uint = trytes.split('').map(t => { return TRYTE_TO_DEFAULT[t] }).join('');

  return parseInt(uint, 27);
}

export function booleanToTryte(bool: bool): string {
  if (bool)
    return 'A';
  else
    return '9';
}

export function tryteToBoolean(tryte: string): bool {
  if (tryte === 'A')
    return true;
  else
    return false;
}

function _getEncoder(type: DataTypes): function {
  if (type === 'string') {
    return (input: string): string => {
      return uInt16ToTrytes(input.length * 2) + stringToTrytes(input);
    }
  } else if (type === 'int8') {
    return int8ToTrytes;
  } else if (type === 'uint8') {
    return uInt8ToTrytes;
  } else if (type === 'int16') {
    return int16ToTrytes;
  } else if (type === 'uint16') {
    return uInt16ToTrytes;
  } else if (type === 'int32') {
    return int32ToTrytes;
  } else if (type === 'uint32') {
    return uInt32ToTrytes;
  } else if (type === 'bool') {
    return booleanToTryte;
  }
}

function _getDecoder(type: DataTypes): function {
  if (type === 'string') {
    return (trytes: string): string => {
      let length = trytesToUInt(); // 4
      return [length, trytes];
    }
  } else if (type === 'int8') {
    return [2, trytesToInt8];
  } else if (type === 'uint8') {
    return [2, trytesToUInt];
  } else if (type === 'int16') {
    return [4, trytesToInt16];
  } else if (type === 'uint16') {
    return [4, trytesToUInt];
  } else if (type === 'int32') {
    return [7, trytesToInt32];
  } else if (type === 'uint32') {
    return [7, trytesToUInt];
  } else if (type === 'bool') {
    return [1, tryteToBoolean];
  }
}

export function arrayToTrytes(array: Array<any>, type: DataTypes): string {
  // First get the proper function from the type, IF type is 'string' then also save the length of the string
  let conversion = _getEncoder(type);
  // Now break the array down to trytes
  let trytes = uInt8ToTrytes(array.length); // Thus the max array size is 255
  array.forEach(value => { trytes += conversion(value) });

  return trytes;
}

export function trytesToArray(trytes: string, type: DataTypes): Array<any> {

}

export default {
  stringToTrytes,
  trytesToString,
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
  arrayToTrytes,
  trytesToArray
};
