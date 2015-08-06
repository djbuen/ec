'use strict';

/**
 * @ngdoc function
 * @name ecApp.controller:AuthAuthctrlCtrl
 * @description
 * # AuthAuthctrlCtrl
 * Controller of the ecApp
 */
angular.module('ecApp')
.controller('UserSessionCtrl',function($scope, $location, $auth, $cookieStore) {
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
  $scope.logout = function($location) {
    $auth.signOut();
    $cookieStore.remove('user');
    $location.path('/home');
    };
	});
