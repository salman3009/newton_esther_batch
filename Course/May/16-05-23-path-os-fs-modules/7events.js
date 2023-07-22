const eventEmitter = require('events');

const eventsHandler = new eventEmitter();


//event listener
eventsHandler.on('read',(name)=>{
  console.log("read events is listening your response",name);  
});

//event trigger
eventsHandler.emit('read',"amol");
eventsHandler.emit('read',"prashant");
