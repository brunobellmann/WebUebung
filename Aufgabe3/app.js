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

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

//GET METHODS

//ITEMS
//returning all items from JSON
app.get('/items', (req, res) => {
    return res.send(json);
});

//returning country to requested id with all properties
app.get('/items/:id', (req, res) => {
    for (var i = 0; i < json.length; i++) {
        if (json[i].id === req.params.id) {
            return res.send(json[i]);
        }
    }
    return res.send('No such id ' + req.params.id + ' in database');
});

// returning all countries between id1 and id2
app.get('/items/:id1/:id2', (req, res) => {
    var arr = new Array();
    var ids = new Array();
    var id1 = req.params.id1;
    var id2 = req.params.id2;
    // collect ids vor id range check
    for (var i = 0; i < json.length; i++) {
        ids.push(json[i].id);
    }
    ids.sort()
    // check valid range
    if (ids[0] > id1 || ids[ids.length - 1] < id2 || id1 > id2) {
        return res.send('Range not possible'); //if Range not exists
    }
    // collect items in range
    for (var i = 0; i < json.length; i++) {
        if (json[i].id >= id1 && json[i].id <= id2) {
            arr.push(json[i]);
        }
    }
    return res.send(arr);
});

//PROPERTIES
//returning all properties
app.get('/properties', (req, res) => {
    var props = new Array();
    if (json.length) {
        // collect all properties from one item
        for (var key in json[0]) {
            props.push(key);
        }
    }
    return res.send(props);
});

//returning property with number num
app.get('/properties/:num', (req, res) => {
    var num = req.params.num;
    var props = new Array();
    // collect props
    if (json.length) {
        for (var key in json[0]) {
            props.push(key);
        }
    }
    // check prop num in range or not
    if (props.length - 1 >= parseInt(num) && parseInt(num) >= 0) {
        return res.send(props[num]);
    } else {
        //to implement user feedback:
        return res.send('No such property value'); //if num not exist
    }
});

// to parse right json Data
// especially for JSONData
app.use(bodyParser.urlencoded({ extended: false }));

//POST
//Add Items
app.post('/items', (req, res) => {
    var name = req.body.name;
    var birthrate = req.body.birthrate;
    var cellphones = req.body.cellphones;

    var ids = new Array();
    // collect ids
    for (var i = 0; i < json.length; i++) {
        ids.push(json[i].id);
    }
    ids.sort();
    // increment highest id in list
    var id = parseInt(ids[ids.length - 1], 10) + 1;
    // build object
    var obj = {
        'id': id.toString().length < 2 ? "00" + id.toString() : "0" + id.toString(),
        'name': name,
        'birth_rate_per_1000': birthrate,
        'cell_phones_per_100': cellphones,
        'children_per_woman': '',
        'electricity_consumption_per_capita': '',
        'internet_user_per_100': ''
    }

    // add to list
    json.push(obj);
    return res.send(json)
    //to implement user feedback:
    return res.send('Added country ' + name + ' to list');
});

//DELETE
//delete last record from list
app.delete('/items', (req, res) => {
    // delete if theres something to delete
    if (json.length) {
        var last_ele = json.pop();
        return res.send(json);
        //to implement user feedback:
        return res.send('Deleted last country: ' + last_ele.name + '!');
    } else {
        return res.send('No items to delete!');
    }
    
});

//delete country with id
app.delete('/items/:id', (req, res) => {
    for (var i = 0; i < json.length; i++) {
        if (json[i].id === req.params.id) {
            var id = json[i].id;
            // delete item at index
            json.splice(i, 1);
            return res.send(json);
            //to implement user feedback:
            return res.send('Item ' + id + ' deleted successfully.'); //success
        }
    }
    //to implement user feedback:
    return res.send('No such id ' + req.params.id + ' in database'); //no success
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});