angular.module('app').controller('mainController', function($scope, $state, mainService){

  $scope.getGameName = function(searchTB){
    mainService.getVideoGameByName(searchTB).then(function(response){
      $scope.gameNames = response;
    })

  }
  $scope.click = function(id){
    console.log("clicked");
    $state.go("game", {game: id});
  }


})
