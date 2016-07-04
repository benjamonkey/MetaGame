angular.module('app').controller('wiiController', function($scope, $state, mainService){

  $scope.test = "wubwub";
  console.log($state.params.game)
  $scope.getGamePlatform = function(searchTB){
    mainService.getVideoGameByWII(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGamePlatform($state.params.game);

})
