const {format,createLogger,transports} = require('winston');
const {timestamp,combine,prettyPrint} = format;

const logger = createLogger({
       format:combine(timestamp({
        format:'MMM-DD-YYYY HH:mm:ss'
       }),prettyPrint()),
       transports:[
           new transports.File({
               level:'info',
               filename:'logs/info.log'
           })
       ]
});

module.exports = logger;