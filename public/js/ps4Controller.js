angular.module('app').controller('ps4Controller', function($scope, $state, mainService){

  
  console.log($state.params.game)
  $scope.getGamePlatform = function(searchTB){
    mainService.getVideoGameByPS4(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGamePlatform($state.params.game);

})
