'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('MainCtrl', function ($scope, $resource) {
    $scope.addTodo = function() {
      $scope.awesomeThings.push($scope.todo);
      $scope.todo = '';
    };
    $scope.removeTodo = function(index) {
      $scope.awesomeThings.splice(index, 1);
    };
    var Post = $resource('http://198.58.120.167:9000/posts/:id.json', null, {
	    'update': { method: 'PUT', params: {id: "@id"}}
	    });
    $scope.updateTodo = function(todo) {
    var Post = $resource('http://198.58.120.167:9000/posts/:id.json', null, {
	    'update': { method: 'PUT', params: {id: "@id"}}
	    });
		$scope.post = Post.get({id: todo.id}, function(){
			$scope.post.title = todo.title;
			$scope.post.$update(function(u, putResponseHeaders) {
				if(u === null) return $q.reject("Error, server returned null");
				return u;
			});
		 });
    };
    $scope.items = Post.query();
  });
