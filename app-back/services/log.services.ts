var logModel = require('../models/log.models');
var mongoose = require( 'mongoose' );

export class LogService{
    logTest(){
        console.log("Log Service");
    }
}

// const LogService = {
//     logTest(){
//         console.log("Log Service");
//     }
// }

// module.exports = LogService;