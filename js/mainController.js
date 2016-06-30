angular.module('app').controller('mainController', function($scope, mainService){

  $scope.getGameName = function(searchTB){
    mainService.getVideoGameByName(searchTB).then(function(response){
      $scope.gameNames = response;
    })

  }


})
