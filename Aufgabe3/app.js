// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!

/** Brunos Aufgabe */
/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/

// var for Parse and JSONObject
var csvParser = new Converter({});
var csvPath = "world_data.csv";
var json;

csvParser
.fromFile(csvPath)
.then((jsonObject)=>{
    json = jsonObject;
})

/** unser beiden Aufgabe @Adrian   */
/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

//GET METHODS

//ITEMS
//returning all items from JSON
app.get('/items/', (req, res) => {
    //falls du testen willst ob die json wirklich ankommt -> /items
    return res.send(JSON.stringify(json));
});

//returning country to requested id with all properties
app.get('/items/:id', (req, res) => {
    //console log falls man testen will ob der payload mitkommt
    //console.log(req.params.id);
    return res.send(JSON.stringify(json));
    return res.send('No such id ' + req.params.id + ' in database'); //if no id
});

// returning all countries between id1 and id2
app.get('/items/:id1/:id2', (req, res) => {
    return res.send('Range not possible'); //if Range not exists
});

//PROPERTIES
//returning all properties
app.get('/properties', (req, res) => {
    //return res.send('Recieved something'); //keine message beschrieben
});

//returning property with number num
app.get('/properties/:num', (req, res) => {
    return res.send('No such property value'); //if num not exist
});

//POST
//Items
app.post('/items', (req, res) => {
    return res.send('Added country {name} to list'); //name musst du austauschen
});

//DELETE
//delete last record from list
app.delete('items', (req, res) => {
    return res.send('Deleted last country: {name}!'); //name musst du noch austauschen
});

//delete country with id
app.delete('items/:id', (req, res) => {
    return res.send('Item ' + req.paramas.id + 'deleted successfully.'); //success
    return res.send('No such id ' + req.params.id + ' in database'); //no success
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});