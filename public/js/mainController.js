angular.module('app').controller('mainController', function($scope, $state, mainService){

  $scope.getGameName = function(searchTB){
    mainService.getVideoGamesByName(searchTB).then(function(response){
      $scope.gameNames = response;
    })

  }
  $scope.click = function(id){
    console.log("clicked", id);
    $state.go("game", {game: id});
  }

  mainService.getPop().then(function(response){
    $scope.popgames = response;
  });
  mainService.getGenre().then(function(response){
    $scope.popgames = response;
  });


})
