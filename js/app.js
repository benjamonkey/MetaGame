angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
            .state('home',{
                url:'/',
                templateUrl: "./views/home.html",
                controller: "mainController",
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
            .state('oldschool',{
                url:'/oldschool',
                templateUrl: "./views/oldschool.html",
                controller: 'oldschoolController',

            });

        $urlRouterProvider
            .otherwise('/');



})
