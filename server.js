
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

var pcGames = `48190
44468
49833
24024
32887
30475
24079
36113
49884
41484
49817
42033
39256
43649
36765`
var ps4Games = `48190
42918
46569
48754
49833
41484
36067
35398
51102
30475
43649
36765
42912
36989
48618`
var xboxGames = `42905
46549
49833
36067
20654
48190
42918
36765
49884
41484
34407
48306
46552
30475
48754`
var wiiGames = `35573
46580
42931
42929
51484
46584
42932
30475
46582
39764
41349
52917
49802`
var oldGames = `8307
15738
7358
2931
19071
12460
3166
21256
10276
15990
19125
10920
7326
22950
4350
8251
14528
21595`
var fps = `18162
54453
20654
1539
36113
36067
48190
42905
39035
26782
48754
48618
51102`
var mmo = `44468
26770
21223
33394
24205
36171
45837
42844
49884
49833
12107`
var moba = ``


function makeReq(gameID){
      return axios.get(`http://www.giantbomb.com/api/game/${gameID}/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json`);
}

app.get('/gamepopular', function(req, res){
  console.log("popularity");
  var pcArr = [];
  var ps4Arr = [];
  var xboxArr = [];
  var wiiArr = [];
  var oldArr = [];


  if (req.query.platform === 'pc'){
    pcGames.split(`\n`).forEach( e => pcArr.push(makeReq(e)));
     axios.all(pcArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));

  }else if (req.query.platform === 'ps4') {
    ps4Games.split(`\n`).forEach( e => ps4Arr.push(makeReq(e)));
     axios.all(ps4Arr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }else if (req.query.platform === 'xbox') {
    xboxGames.split(`\n`).forEach( e => xboxArr.push(makeReq(e)));
     axios.all(xboxArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }else if (req.query.platform === 'wii') {
    wiiGames.split(`\n`).forEach( e => wiiArr.push(makeReq(e)));
     axios.all(wiiArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }else if (req.query.platform === 'old') {
    oldGames.split(`\n`).forEach( e => oldArr.push(makeReq(e)));
     axios.all(oldArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }


})
