angular.module('app').service('mainService', function($http, $q) {

    var host = '//localhost:3000';

    this.getVideoGamesByName = function(searchTB) {
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: host + "/games/" + searchTB
        }).then(function(response) {
            console.log(response);
            deferred.resolve(response.data.results);
        })
        return deferred.promise;
    };

    this.getVideoGameByName = function(searchTB) {
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: host + "/game/" + searchTB
        }).then(function(response) {
            console.log(response);
            deferred.resolve(response.data.results);
        })
        return deferred.promise;
    };


    this.getPop = function() {
        var platform = location.hash.substring(2);
        return $http.get('/gamepopular/?platform=' + platform).then(function(resp) {
            return resp.data.map(function(e) {
                return e.results;
            })
        })
    }
    this.getGenre = function() {
        var genre = location.hash.substring(2);
        return $http.get('/gamepopular/?genre=' + genre).then(function(resp) {
            return resp.data.map(function(e) {
                return e.results;
            })
        })
    }

    this.getReview = function(gameID) {
        console.log(gameID);
        var review = location.hash.substring(2);
        return $http.get('/api/review/?gameID=' + gameID).then(function(resp) {
            return resp.data;

        })
    }

    this.getUser = function() {
        var review = location.hash.substring(2);
        return $http.get('/api/review/?id=' + gameID.id).then(function(resp) {
            return resp.data.map(function(e) {
                return e.results;
            })
        })
    }

    this.postReview = function(data) {
        return $http.post('/api/review/', data);
    }

    this.getCurrentUser = function() {
        return $http.get('/auth/me').then(function(resp) {
            return resp.data;
        })
    }
    this.logout = function(){
      return $http.get('auth/logout');
    }
    this.getUserReviews = function(){
      return $http.get('/api/userreview').then(function(resp){
        return resp.data;
      })
    }
    this.deleteReview = function(id){
      return $http.delete('/api/review/' + id).then(function(resp){
        return resp.data;
      })
    }






})
