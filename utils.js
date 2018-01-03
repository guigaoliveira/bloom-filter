const xxhash = require("xxhash");
const farmhash = require("farmhash");
const seedrandom = require("seedrandom");
const seed = Math.abs(seedrandom().int32());
const isString = obj =>
  Object.prototype.toString.call(obj) === "[object String]";
const getBuffer = val => Buffer.from(val, "ascii");
const applyFarmHash = val => farmhash.hash64WithSeed(getBuffer(val), seed);
const applyXXHash = val => xxhash.hash64(getBuffer(val), seed).readUInt32LE(0);
const len = arr => arr.length;
const nthHash = (data, n, arr) =>
  (applyFarmHash(data) + n * applyXXHash(data)) % len(arr);
const setOneToArray = (arr, i) => {
  if (!arr[i]) arr[i] = 1;
  return arr;
};

module.exports = { nthHash, setOneToArray, isString };
