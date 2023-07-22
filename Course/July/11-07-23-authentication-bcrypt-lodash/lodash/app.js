const _=require('lodash');


// let words = ['sky','wood','forest'];
// console.log(_.first(words));
// console.log(_.last(words));

// let num =[1,2,3,45,667];
// console.log(_.nth(num,3));

// let numChunck = [444,555,333,222,111,888,777,666];
// console.log(_.chunk(numChunck,3));

// let sumValues = [444,555,333,222,111,888,777,666];
// console.log(_.sum(sumValues));

// let filterValues = [17,19,34,10];
// let result = _.filter(filterValues,(data)=>data>=18);
// console.log(result);

let obj = {age:24,name:'rakesh',occupation:'teacher'};
// console.log(_.keys(obj));
// console.log(_.values(obj));

console.log(_.isNumber(33));
console.log(_.isString('33'));
console.log(_.isArray([]));
console.log(_.isObject({}));