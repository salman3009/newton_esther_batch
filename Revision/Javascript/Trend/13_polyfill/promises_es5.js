"use strict";

var greet = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("Welcome to GeeksforGeeks!");
    document.getElementById("one").innerHTML = "Poly means that it could be  \n        solved using a wide range of techniques it  \n        wasn't limited to just being done using  \n        JavaScript, and fill would fill the gap in \n        the browser where the technology was needed.";
    document.getElementById("two").innerHTML = "A polyfill is a piece of code  \n        that adds functionality to older browsers  \n        that have incompatibility issues.";
    document.getElementById("three").innerHTML = "In older browsers, Promises,  \n        Array.from, Array.includes, Array.of, Map,  \n        Set, Symbol, object.values, etc require  \n        polyfill support by explicitly defining  \n        the functions";
    document.getElementById("four").innerHTML = "Promises represent uncompleted operations.";
  }, 3000);
});
greet.then(function (msg) {
  console.log(msg);
});
