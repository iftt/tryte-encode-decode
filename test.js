const iotaAreaCodes = require('@iota/area-codes');

const iac = iotaAreaCodes.encode(52.52, 13.41);
console.log("IOTA Area Code", iac);

const iacHighPrecision = iotaAreaCodes.encode(52.52, 13.41, iotaAreaCodes.CodePrecision.EXTRA);
console.log("IOTA Area Code High Precision", iacHighPrecision);
