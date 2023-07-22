let obj={
    firstName:"akash",
    price:4000
};

for(let key in obj){
    console.log("input 1",key);
    //firstName,price
    console.log("input 2",obj[key]);
    //akash,price
}

let product=[{id:1,firstName:"akash"},{id:2,firstName:"sures"}];

for(let key in product){
    console.log("input 1",key);
    //0,1
    console.log("input 2",product[key]);
    //{id:1,firstName:"akash"}
    //{id:2,firstName:"sures"}
}