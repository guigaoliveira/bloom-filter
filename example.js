const bloom = require("./index");

const myBloom = bloom.create(100, 0.01);
bloom.add("hi!");
console.log(bloom.size());
console.log(bloom.test("hi!"));
console.log(bloom.test("hello!"));
