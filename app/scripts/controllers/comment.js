'use strict';
/**
 * @ngdoc function
 * @name blogApp.controller:PostCtrl
 * @description
 * # MainCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('CommentCtrl', function($rootScope, $scope, $resource, $auth, Post, $cookieStore) {
     var resource = $resource('/api/comments/:id.json',{},{
        get:{
            method: "GET",
            headers : $auth.retrieveData('auth_headers')
        },
        save:{
            method:"POST",
            headers : $auth.retrieveData('auth_headers')
        },
        query:{
            method:"GET",
            headers : $auth.retrieveData('auth_headers'),
            isArray: true
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
    $scope.addComment = function(post) {
      var comment = {post_id: post.id, body: $scope.item.body };
      post.comments.push(comment);
      resource.save(comment);
      $scope.item.body = '';
    };
    $scope.removePost = function(index) {
      $scope.posts.splice(index, 1);
      resource.delete({id: index.id},function(u, putResponseHeader){
      });
    };
    //var Post = $resource('http://198.58.120.167:3000/api/posts/:id.json', null, {
	   // 'update': { method: 'PUT', params: {id: "@id"}}
			//});
    $scope.updatePost = function(item) {
		$scope.post = resource.get({id: item.id}, function(){
			$scope.post.title = item.title;
			$scope.post.body = item.body;
      $scope.post.$update({id: item.id});
		 });
    };

   $scope.comments = resource.query();
  });
