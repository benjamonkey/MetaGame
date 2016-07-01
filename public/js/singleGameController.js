angular.module('app').controller('singleGameController', function($scope, $state, mainService){

  console.log($state.params.game)
  $scope.getGameName = function(gameID){
    mainService.getVideoGameByName(gameID).then(function(response){
      console.log(response);
      $scope.gameID = response[0];

    })

  }
  $scope.getGameName($state.params.game);

})
