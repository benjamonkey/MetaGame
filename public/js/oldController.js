angular.module('app').controller('oldschoolController', function($scope, $state, mainService){

  
  console.log($state.params.game)
  $scope.getGamePlatform = function(searchTB){
    mainService.getVideoGameByOLD(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGamePlatform($state.params.game);

})
