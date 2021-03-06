var mongoose = require('mongoose');
var session = require('express-session');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require('passport');
var User = require('./user');
var review = require('./models/review');

var axios = require('axios');
var cors = require('cors');
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
var data = [];
var configAuth = require('./auth');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use('facebook', new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['emails', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {

      process.nextTick(function(){
          User.findOne({'facebook.id' : profile.id}, function(err, user){
            if(err){
              return done(err);
            }
            if (user) {
              console.log(profile);
              return done(null, user);
            }
            else{

              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = accessToken;
              newUser.facebook.name= profile.displayName;
              newUser.facebook.email = profile.emails[0].value;


              newUser.save(function(err){
                if(err){
                  throw(err);
                }
                return done(null, newUser);
              })
            }
          })

      });

  }
));

app.listen(3000, function(){console.log("suhhh dude port 3000 is amaze")});
mongoose.connect('mongodb://localhost/metagame');

app.get('/games/:searchTB', function(req, res){
  console.log(req.user);
  console.log("getting games by name");
  axios.get(`http://www.giantbomb.com/api/games/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json&sort=original_release_date:desc&filter=name:${req.params.searchTB}`)
   .then( resp => res.send(resp.data))
})

app.get('/game/:gameID', function(req, res){
  console.log("getting game by id");
  axios.get(`http://www.giantbomb.com/api/game/${req.params.gameID}/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json`)
   .then( resp => res.send(resp.data))
})

app.post('/api/review', function(req, res) {
  console.log('POST review');
    req.body.postedBy = req.user.facebook.name;
    req.body.rating = Number(req.body.rating);
      review.create(req.body, function(err, savedReview){
        console.log(err, savedReview);
        if (err){
          res.status(500).json(err);
        }else {
          res.status(200).json(savedReview);
  }

});

});

app.get('/api/review', function(req, res) {
  console.log('GET reviews');
      review.find(req.query, function(err, savedReview){
        if (err){
          res.status(500).json(err);
        }else {
          res.status(200).json(savedReview);
  }

});

});
app.delete('/api/review/:id', function(req, res) {
  console.log(req.params.id);
      review.findByIdAndRemove(req.params.id, function(err, reviews){
        if (err){
          res.status(500).json(err);
        }else {
          res.status(200).json(reviews);
  }

});

});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/user',
  // DOUBLE CHECK THIS
                                      failureRedirect: '/' }));
app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/me', function(req, res){
  console.log(req.user);
  res.send(req.user);

});

app.get('/auth/logout', function(req, res){
  req.logout();
})

app.get('/api/userreview', function(req, res) {
  console.log(req.user);
      review.find({postedBy: req.user.facebook.name},function(err, savedReview){
        if (err){
          res.status(500).json(err);
        }else {
          res.status(200).json(savedReview);
  }

});

});




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
var fpsGames = `18162
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
51102
46552
17448`

var rpgGames = `44468
26770
21223
33394
24205
36171
45837
42844
49884
49833
12107
22516
48901
48755
21958`
var mobaGames = `24024
32887
36241
36739
46940
27328
43487
51414
34265
52342`


function makeReq(gameID){
      return axios.get(`http://www.giantbomb.com/api/game/${gameID}/?api_key=53f52d0efe71c57da724633715458b37cd07a278&format=json`);
}

app.get('/gamepopular', function(req, res){
  console.log("get popular games");
  var pcArr = [];
  var ps4Arr = [];
  var xboxArr = [];
  var wiiArr = [];
  var oldArr = [];
  var mobaArr = [];
  var fpsArr = [];
  var rpgArr = [];


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
  }else if (req.query.genre === 'moba') {
    mobaGames.split(`\n`).forEach( e => mobaArr.push(makeReq(e)));
     axios.all(mobaArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }else if (req.query.genre === 'fps') {
    fpsGames.split(`\n`).forEach( e => fpsArr.push(makeReq(e)));
     axios.all(fpsArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }else if (req.query.genre === 'rpg') {
    rpgGames.split(`\n`).forEach( e => rpgArr.push(makeReq(e)));
     axios.all(rpgArr)
       .then(resp => res.status(200).send(resp.map(e => e.data)))
       .catch(err => res.status(500).send(err));
  }







})
