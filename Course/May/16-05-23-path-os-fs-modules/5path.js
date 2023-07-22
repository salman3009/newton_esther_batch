const global = require('path');

let localDetails = 'users/amol/index.js';

let extension = global.extname(localDetails);
console.log(extension);

let directory = global.dirname(localDetails);
console.log(directory);

let fileName = global.basename(localDetails);
console.log(fileName);

console.log(__dirname);
