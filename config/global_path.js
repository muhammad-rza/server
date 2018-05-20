
/*====================================================
*                    DON`T CNAHGE
* ===================================================*/

var {cmd_color} = require('../lib/cmd_color');

try {

    if(typeof process.env.NODE_ENV == 'undefined')
        global.APP_INIT = require('../config/development'); // output  ( development or production )
    else
        global.APP_INIT = require('../config/'+process.env.NODE_ENV); // output  ( development or production )
}

catch(e){

    console.log(cmd_color('FgGreen'),'------------------------ ERROR ------------------------');
    console.log(e);
    console.log(cmd_color('FgGreen'),'------------------------ ERROR ------------------------');
    process.exit(1);

}



global.NODE_ENV = process.env.NODE_ENV;


/**
* Api directory paths
* */

global.API_BASE_PATH  = APP_ROOT_PATH +  'Api/';
global.API_CONTROLLER_PATH  = API_BASE_PATH +  'Controller/';
global.API_MODEL_PATH  = API_BASE_PATH +  'Model/';
global.API_ROUTE_PATH  = API_BASE_PATH +  'Route/';