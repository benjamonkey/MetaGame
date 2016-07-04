angular.module('app').service('mainService', function($http, $q){

  var host = '//localhost:3000'

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

  this.getVideoGameByPC = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/pc/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };

  this.getVideoGameByPS4 = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/ps4/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };

  this.getVideoGameByXBOX = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/xbox/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };

  this.getVideoGameByWII = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/wii/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };

  this.getVideoGameByOLD = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: host + "/old/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };



})
