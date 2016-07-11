angular.module('app').controller('userController', function($scope, $state, mainService){

  $scope.getUser = function(){
    mainService.getCurrentUser().then(function(resp){
      console.log(resp);
      return $scope.user = resp;
    });

  }
  $scope.getUser();
  $scope.logout = function(){
    mainService.logout();
  };

  $scope.getReview = function(){
    console.log('dude')
    mainService.getUserReviews().then(function(resp){
      console.log(resp)
       $scope.reviews = resp;
    })
  }
  $scope.deleteReview = function(id){
    mainService.deleteReview(id).then(function(resp){
      $scope.getReview();
    })
  }
  $scope.getReview();
})
