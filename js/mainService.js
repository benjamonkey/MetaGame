angular.module('app').service('mainService', function($http, $q){

  this.getVideoGameByName = function(searchTB){
    var deferred = $q.defer();
     $http({
      method: "GET",
      url: "http://localhost:3000/" + searchTB
    }).then(function(response){
      console.log(response);
      deferred.resolve(response.data.results);
    })
    return deferred.promise;
  };



})
