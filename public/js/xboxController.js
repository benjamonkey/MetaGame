angular.module('app').controller('xboxController', function($scope, $state, mainService){


  console.log($state.params.game)
  $scope.getGamePlatform= function(searchTB){
    mainService.getPop(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGamePlatform($state.params.game);

})
