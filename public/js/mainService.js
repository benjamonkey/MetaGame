angular.module('app').service('mainService', function($http, $q){

  var host = '//localhost:3000';

  this.getVideoGamesByName = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/games/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };

  this.getVideoGameByName = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/game/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };


  this.getPop = function(){
    var platform = location.hash.substring(2);
    return $http.get('/gamepopular/?platform='+ platform).then(function(resp){
      return resp.data.map(function(e){
        return e.results;
      })
    })
  }

  // this.getGenre = function(){
  //   var genre = location.hash.substring(2);
  //   return $http.get('/gamepopular/?genre='+ genre).then(function(resp){
  //     return resp.data.map(function(e){
  //       return e.results;
  //     })
  //   })
  // }



})
