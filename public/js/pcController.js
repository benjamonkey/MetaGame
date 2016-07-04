angular.module('app').controller('pcController', function($scope, $state, mainService){


  console.log($state.params.game)
  $scope.getGamePlatform = function(searchTB){
    mainService.getVideoGameByPC(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGamePlatform($state.params.game);

})
