const farmhash = require("farmhash");
const seedrandom = require("seedrandom");
const createSeed = () => Math.abs(seedrandom().int32());
const seed1 = createSeed();
const seed2 = createSeed();
const isString = obj =>
  Object.prototype.toString.call(obj) === "[object String]";
const getBuffer = val => Buffer.from(val, "ascii");
const applyHash = (val, seed) => farmhash.hash64WithSeed(getBuffer(val), seed);
const len = arr => arr.length;
const hash = (arr, val, k) =>
  (applyHash(val, seed1) + k * applyHash(val, seed2)) % len(arr); // see http://citeseer.ist.psu.edu/viewdoc/download;jsessionid=4060353E67A356EF9528D2C57C064F5A?doi=10.1.1.152.579&rep=rep1&type=pdf
const floor = x => Math.floor(x);
const toCorrect = x => Math.abs(Math.floor(x));
const ln = x => Math.log(x);
const changeLogBase = (x, y) => ln(y) / ln(x);
const log2 = x => changeLogBase(x, 2);
module.exports = { hash, isString, len, toCorrect, floor, ln, log2 };
