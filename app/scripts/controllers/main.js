'use strict';
/**
 * @ngdoc function
 * @name ecApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ecApp
 */
angular.module('ecApp')
  .controller('MainCtrl', function($rootScope, $scope, $resource, $auth, Post, $cookieStore) {
     var resource = $resource('/api/all_posts.json',{},{
        save:{
            method:"POST",
            headers : $auth.retrieveData('auth_headers')
        },
        query:{
            method:"GET",
            headers : $auth.retrieveData('auth_headers'),
            isArray: true
        }
    });
    $scope.user = $cookieStore.get('user');
    $scope.addPost = function() {
      var post = {title: $scope.title, body: $scope.body };
      $scope.posts.push({title: $scope.title, body: $scope.body });
      resource.save(post);
      $scope.post = '';
    };
    $scope.removePost = function(index) {
      $scope.posts.splice(index, 1);
    };
    //var Post = $resource('http://198.58.120.167:3000/api/posts/:id.json', null, {
	   // 'update': { method: 'PUT', params: {id: "@id"}}
			//});
    $scope.updatePost = function(post) {
		$scope.post = Post.get({id: post.id}, function(){
			$scope.post.title = post.title;
			$scope.post.$update(function(u, putResponseHeaders) {
				if(u === null) return $q.reject("Error, server returned null");
				return u;
			});
		 });
    };

 console.log($auth.retrieveData('auth_headers'));
console.log($scope.headers);



   $scope.search_name = "";
   $scope.searchProduct = function() {
    var all_post = $resource('/api/all_posts.json',{ title: $scope.search_name},{
          query:{
              method:"GET",
              headers : $auth.retrieveData('auth_headers'),
              isArray: true
          }});
     $scope.posts = all_post.query();
   }
   $scope.posts = resource.query();
  });
