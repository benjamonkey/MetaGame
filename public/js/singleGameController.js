angular.module('app').controller('singleGameController', function($scope, $state, mainService){

  
  console.log($state.params.game)
  $scope.getGameName = function(searchTB){
    mainService.getVideoGameByName(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGameName($state.params.game);

})
