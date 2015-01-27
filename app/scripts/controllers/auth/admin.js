'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AuthAuthctrlCtrl
 * @description
 * # AuthAuthctrlCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
.controller('AdminCtrl',function($scope, $location, $auth, $cookieStore) {
	$scope.handleRegBtnClick = function() {
		$auth.submitRegistration($scope.user, { config: 'adminUser'})
		.then(function() {
			$auth.submitLogin({
				email: $scope.user.email,
				name: $scope.user.username,
				password: $scope.user.password
        }, { config: 'adminUser' });
      }
      );
		};
	$scope.submitLogin = function() {
			$auth.submitLogin({
				email: $scope.user.email,
				password: $scope.user.password }, { config: 'adminUser' });
			};
  $scope.logout = function($location) {
    $auth.signOut({config: 'adminUser' });
    $cookieStore.remove('user');
    $location.path('/home');
    };
	});
