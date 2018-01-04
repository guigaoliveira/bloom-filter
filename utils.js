const farmhash = require("farmhash");
const seedrandom = require("seedrandom");
const createSeed = () => Math.abs(seedrandom().int32());
const seed1 = createSeed();
const seed2 = createSeed() + seed1;
const isString = obj =>
  Object.prototype.toString.call(obj) === "[object String]";
const getBuffer = val => Buffer.from(val, "ascii");
const applyFarmHash = (val, seed) =>
  farmhash.hash64WithSeed(getBuffer(val), seed);
const len = arr => arr.length;
const nthHash = (arr, val, k) => {
  const hash1 = applyFarmHash(val, seed1);
  const hash2 = applyFarmHash(val, seed2);
  return (hash1 + k * hash2) % len(arr);
};
const setOneToArray = (arr, val, k) => {
  const index = nthHash(arr, val, k);
  if (!arr[index]) arr[index] = 1;
};

module.exports = { nthHash, setOneToArray, isString };
