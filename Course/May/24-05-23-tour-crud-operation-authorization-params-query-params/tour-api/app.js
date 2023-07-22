const express = require('express');
const app = express();
const parser = require('body-parser');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

let user = {
    role: 'admin',
    loginStatus: false
};

//storing tour details
let list = [
    {
        source: 'delhi',
        destination: 'mumbai',
        payment: 6000
    },
    {
        source: 'delhi',
        destination: 'chandigarh',
        payment: 12000
    },
    {
        source: 'pune',
        destination: 'mumbai',
        payment: 6000
    },
    {
        source: 'surat',
        destination: 'mumbai',
        payment: 5000
    },
    {
        source: 'kochi',
        destination: 'bangalore',
        payment: 1000
    }
];

app.get('', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/register', (req, res) => {
    if (req.body.email && req.body.userName && req.body.password) {
        user = { ...user, ...req.body };
        res.sendFile(__dirname + '/login.html');
    }
    else {
        res.sendFile(__dirname + "/error.html");
    }
})

const loginValidationMiddleware = (req, res, next) => {
    //authenticate process
    console.log("coming to loginValidationMiddleware");
    if (!req.body.email || !req.body.password) {
        return res.sendFile(__dirname + "/error.html");
    }
    return next();
}

const loginCheckingDetailsMiddleware = (req, res, next) => {
    //authenticate process
    console.log("checking email and password data");
    if (req.body.email != user.email || req.body.password != user.password) {
        return res.sendFile(__dirname + '/error.html');
    }
    return next();
}

const checkLoginStatus = (req, res, next) => {
    console.log(user);
    //authorization process
    if (user.loginStatus && user.role === 'admin') {
        return next();
    }
    else {
        return res.send("<h1>Unauthorized access for this page</h1>")
    }
}


app.post('/login', loginValidationMiddleware, loginCheckingDetailsMiddleware, (req, res) => {
    console.log("login controller");
    user.loginStatus = true;
    res.sendFile(__dirname + '/dashboard.html');
})

app.post('/tourcreate', checkLoginStatus, (req, res) => {
    console.log("everything is created successfully");
    list.push(req.body);
    res.sendFile(__dirname + '/dashboard.html');
})

//progress 1 - bringing all data
// app.get('/tourread',(req,res)=>{
//     console.log("everything is created successfully");
//     res.status(200).json({
//         data:list
//     });
// })


//progress 2 - filtering data only with particular property
//url params
//http://localhost:3000/tourread/sydney/mumbai
// app.get('/tourread/:source/:destination',(req,res)=>{
//     console.log("everything is created successfully");
//     console.log("params",req.params.source,req.params.destination);
//     res.status(200).json({
//         data:list
//     });
// })

app.get('/tourread/:source', (req, res) => {
    console.log("params", req.params.source);
    let result = [];
    if(req.params.source!='list'){
       result =  list.filter((obj) => {
            return obj.source === req.params.source;
        })
    }
    else{
        result = list;
    }
   
    res.status(200).json({
        data: result
    });
})

//update operation
app.put('/tourupdate/:index',(req,res,next)=>{
      let result = list[req.params.index];
      if(result){
        console.log(req.body);
        list[req.params.index]={...result,...req.body};
        res.status(200).json({
            message:"successfully updated"
        })
      }
      else{
        res.status(400).json({
            status:"failed",
            message:"please provide proper index"
        })
      }
})


app.listen(3000, () => {
    console.log("server is running on 30000");
})