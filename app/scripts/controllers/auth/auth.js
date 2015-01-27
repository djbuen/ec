'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AuthAuthctrlCtrl
 * @description
 * # AuthAuthctrlCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
.controller('UserSessionCtrl',function($scope, $location, $auth) {
	$scope.handleRegBtnClick = function() {
		$auth.submitRegistration($scope.user)
		.then(function() {
			$auth.submitLogin({
				email: $scope.user.email,
				password: $scope.user.password
        });
      }
      );
		};
	$scope.submitLogin = function() {
			$auth.submitLogin({
				email: $scope.user.email,
				password: $scope.user.password });
			};

 $scope.handleSignOutBtnClick = function() {
        $auth.signOut()
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };
	});
