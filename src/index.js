/**
 * Created by Andrey on 24.09.2016.
 * skype: snaipi91;
 * mail: snaipi91@rambler.ru
 */
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});