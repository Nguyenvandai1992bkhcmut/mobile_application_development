var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const haversine = require('haversine')

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyC7ekvjIL1uPSebizIYWXJzGeKZ_nVLfIs'
});

//Use ECMA Scrip 6


app.get('/api/description/lat/:lat/long/:long',(request, response) => {

    googleMapsClient.reverseGeocode({latlng: [request.params.lat, request.params.long]}, function(err, res) {
    if (!err) {
        response.json((res.json.results[0].formatted_address));
        response.end()
    }else {
        console.log(err)
    }
    });
});

//example
// //(localhost:300/api/distance/start/10/106/end/10.5/106.5)

app.get('/api/distance/start/:lat_start/:long_start/end/:lat_end/:long_end',function (request,response) {
    const start = {
        latitude: request.params.lat_start,
        longitude: request.params.long_start
    }

    const end = {
        latitude: request.params.lat_end,
        longitude: request.params.long_end
    }

    var distance = haversine(start, end, {unit: 'km'});
    response.write(distance.toString())
    response.end()
});

module.exports = app;
