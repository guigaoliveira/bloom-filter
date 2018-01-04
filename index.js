"use strict";
const { nthHash, setOneToArray, isString } = require("./utils");
const bloomObj = {};
const floor = x => Math.floor(x);
const ln = x => Math.log(x);
const changeLogBase = (x, y) => ln(y) / ln(x);
const log2 = x => changeLogBase(x, 2);
const bestK = (size, nElems) => floor(ln(2) * (size / nElems));
const bestM = (nElems, fpRate) => floor(-(nElems * ln(fpRate) / ln(2) ** 2));
const create = (nElems, fpRate) => {
  const getM = bestM(nElems, fpRate);
  const arrayBuff = new ArrayBuffer(getM);
  return Object.assign(bloomObj, {
    arr: new Uint8Array(arrayBuff),
    kHashs: bestK(getM * 8, nElems)
  });
};
const size = () => bloomObj.arr.length;
const add = val => {
  if (!isString(val)) throw new TypeError("Only String type is allowed!");
  const { arr, kHashs } = bloomObj;
  for (let j = 0; j < kHashs; j++) {
    setOneToArray(arr, val, j);
  }
  return true;
};
const test = val => {
  const { arr, kHashs } = bloomObj;
  for (let j = 0; j < kHashs; j++) {
    if (!arr[nthHash(arr, val, j)]) {
      return false;
    }
  }
  return true;
};
module.exports = { create, add, test, size };
