angular.module('app').controller('singleGameController', function($scope, $state, mainService){


  console.log($state.params.game)
  $scope.getGameName = function(searchTB){
    mainService.getVideoGameByName(searchTB).then(function(response){
      $scope.gameID = response;
    })
  }


  $scope.getGameName($state.params.game);

  $scope.postReview = function(review, gameID){

    review.name = gameID.name;
    review.gameID = gameID.id;
    mainService.postReview(review).then(function(resp){
      console.log(resp);
      $scope.getReview();
    });

  }

  $scope.getReview = function(){
      mainService.getReview($state.params.game).then(function(resp){
        console.log(resp);
        $scope.reviews = resp;
      })

  }
  $scope.getReview();

})
