const http = require('http');

//creating the server
const server = http.createServer((request,response)=>{
    //sending the response
    // response.writeHead(200,{'Content-Type':'text/html'});
    // response.end("<h1>Welcome to html</h1>");
     
    response.writeHead(200,{'Content-Type':'application/json'});
    let result = {
        "fullName":"amol",
        "age":34,
        "status":true
    };
    let jsonContent = JSON.stringify(result);
    response.end(jsonContent);

    // response.writeHead(200,{'Content-Type':'text/plain'});
    // response.end("welcome to javascript");
});

//listening the server
server.listen(3000,()=>{
    console.log("server is running on 3000");
})

