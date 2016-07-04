
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var axios = require('axios');
var cors = require('cors');
app.use(express.static(__dirname + '/public'));
app.use(cors());
var data = [];

app.listen(3000, function(){console.log("we on port 3000")});

app.get('/games/:searchTB', function(req, res){
  console.log("getting games by name");
  axios.get(`http://www.giantbomb.com/api/games/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json&sort=original_release_date:desc&filter=name:${req.params.searchTB}`)
   .then( resp => res.send(resp.data))
})

app.get('/game/:gameID', function(req, res){
  console.log("getting game by id");
  axios.get(`http://www.giantbomb.com/api/game/${req.params.gameID}/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json`)
   .then( resp => res.send(resp.data))
})
