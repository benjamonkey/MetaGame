angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "./views/searchresults.html",
                controller: "mainController",
            })
            .state('game',{
                url:'/game/:game',
                controller:'singleGameController',
                templateUrl: "./views/singleGame.html"
            })
            .state('pc',{
                url:'/pc',
                controller:'pcController',
                templateUrl: "./views/pc.html"
            })
            .state('xbox',{
                url:'/xbox',
                templateUrl: "./views/xbox.html",
                controller: 'xboxController',

            })
            .state('ps4',{
                url:'/ps4',
                templateUrl: "./views/ps4.html",
                controller: 'ps4Controller',

            })
            .state('wii',{
                url:'/wii',
                templateUrl: "./views/wii.html",
                controller: 'wiiController',

            })
            .state('fps',{
                url:'/fps',
                templateUrl: "./views/fps.html",
                controller: 'fpsController',

            })
            .state('moba',{
                url:'/moba',
                templateUrl: "./views/moba.html",
                controller: 'mobaController',

            })
            .state('rpg',{
                url:'/rpg',
                templateUrl: "./views/rpg.html",
                controller: 'rpgController',

            })
            .state('old',{
                url:'/old',
                templateUrl: "./views/old.html",
                controller: 'oldController',

            })
            .state('user',{
                url:'/user',
                templateUrl: "./views/user.html",
                controller: 'userController',

            })
            .state('review',{
                url:'/review',
                templateUrl: "./views/review.html",
                controller: 'reviewController',

            });

        $urlRouterProvider
            .otherwise('/');



})
