'use strict';
/**
 * @ngdoc function
 * @name ecApp.controller:PostCtrl
 * @description
 * # MainCtrl
 * Controller of the ecApp
 */
angular.module('ecApp')
  .controller('PostCtrl', function($rootScope, $scope, $resource, $auth, Post, $cookieStore) {
     var resource = $resource('/api/posts/:id.json',{},{
        get:{
            method: "GET",
            headers : $auth.retrieveData('auth_headers')
        },
        save:{
            method:"POST",
            headers : $auth.retrieveData('auth_headers')
        },
        update: {
            method:"PATCH",
            headers : $auth.retrieveData('auth_headers')
        },
        delete: {
            method:"DELETE",
            headers : $auth.retrieveData('auth_headers')
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
      resource.delete({id: index.id},function(u, putResponseHeader){
      });
    };
    $scope.updatePost = function(item) {
		$scope.post = resource.get({id: item.id}, function(){
			$scope.post.title = item.title;
			$scope.post.body = item.body;
      $scope.post.$update({id: item.id});
		 });
    };

    var all_post = $resource('/api/all_posts.json',{},{
        query:{
            method:"GET",
            headers : $auth.retrieveData('auth_headers'),
            isArray: true
        }});
   $scope.posts = all_post.query();
  });
