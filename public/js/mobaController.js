angular.module('app').controller('mobaController', function($scope, $state, mainService){


  console.log($state.params.game)
  $scope.getGameGenre = function(searchTB){
    mainService.getGenre(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGameGenre($state.params.game);

})
