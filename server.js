const fs = require('fs');
const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
require('babel-register')(babelConfig)
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
if(!require("piping")( {hook: true, ignore: /(\/\.|~$|\.json|\.scss$|webpack\-assets\.js$)/i} )){
    return;
}
require('./src/server');