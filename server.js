
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var axios = require('axios');
var cors = require('cors');
app.use(cors());
var data = [];

app.listen(3000, function(){console.log("we on port 3000 dude")});

app.get('/:searchTB', function(req, res){
  axios.get(`http://www.giantbomb.com/api/games/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json&sort=original_release_date:desc&filter=name:${req.params.searchTB}`)
   .then( resp => res.send(resp.data))
})
