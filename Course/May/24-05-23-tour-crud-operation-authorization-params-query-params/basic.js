let user={
    role:'user'
};

let body={
    username:"akash",
    password:12345
}

user={...user,...body};

console.log(user);

let result ={
    source:"delhi",
    destination:"mumbai",
    payment:3000
}

let frontend={
    payment:4000
}

let finalresult ={...result,...frontend};
console.log(finalresult);
