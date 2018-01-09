"use strict";
const { hash, isString, len, toCorrect, floor, ln, log2 } = require("./utils");
const bloom = {};
const bestK = (nBits, nElems) => toCorrect(ln(2) * (nBits / nElems)); // see https://en.wikipedia.org/wiki/Bloom_filter#Optimal_number_of_hash_functions
const bestM = (nElems, fpRate) =>
  toCorrect(-(nElems * ln(fpRate) / ln(2) ** 2));
const create = (nElems, fpRate) => {
  const getM = bestM(nElems, fpRate);
  const arrayBuff = new ArrayBuffer(floor(getM / 8));
  return Object.assign(bloom, {
    arr: new Uint8Array(arrayBuff),
    hashs: bestK(getM, nElems)
  });
};
const size = () => len(bloom.arr);
const add = val => {
  if (!isString(val)) throw new TypeError("Only String type is allowed!");
  const { arr, hashs } = bloom;
  for (let i = 0; i < hashs; i++) {
    arr[hash(arr, val, i)] = 1;
  }
  return true;
};
const test = val => {
  const { arr, hashs } = bloom;
  for (let i = 0; i < hashs; i++) {
    if (!arr[hash(arr, val, i)]) {
      return false;
    }
  }
  return true;
};
module.exports = { create, add, test, size };
