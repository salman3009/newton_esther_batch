const global = require('os');

let platform = global.platform();
console.log(platform);

let arch = global.arch();
console.log(arch);

let freeMemory = global.freemem();
console.log(freeMemory);