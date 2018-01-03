const bloom = require("./index");

bloom.create(100, 10);
bloom.add("hi!");
console.log(bloom.test("hi!"));
console.log(bloom.test("hello!"));
