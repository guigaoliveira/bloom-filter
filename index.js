"use strict";
const { nthHash, setOneToArray, isString } = require("./utils");
const bloomObj = {};
const create = (filterSize, numHashs) =>
  Object.assign(bloomObj, {
    arr: Array(filterSize).fill(0),
    n: numHashs
  });
const recursiveAdd = (val, arr, n) =>
  n === 0
    ? arr
    : recursiveAdd(val, setOneToArray(arr, nthHash(val, n, arr)), n - 1);
const recursiveTest = (val, arr, n) => {
  if (n === 0) {
    return true;
  }
  return !arr[nthHash(val, n, arr)] ? false : recursiveTest(val, arr, n - 1);
};
const add = val => {
  if (!isString(val)) throw new TypeError("Only String type is allowed!");
  recursiveAdd(val, bloomObj.arr, bloomObj.n);
  return true;
};
const get = () => bloomObj.arr;
const test = val => recursiveTest(val, bloomObj.arr, bloomObj.n);
module.exports = { create, add, test };
