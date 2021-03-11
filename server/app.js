const express = require('express'), 
    routes = require('./routes'),
    http = require('http'),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '8mb'})); 
app.use((req,res,next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.use('/api',routes);

app.set('port', 8080);
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
