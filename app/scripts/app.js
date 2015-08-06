'use strict'
/**
 * @ngdoc overview
 * @name ecApp
 * @description
 * # ecApp
 *
 * Main module of the application.
 */
var app = angular.module('ecApp',[
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ng-token-auth'
]).config(function($routeProvider, $authProvider){
    $authProvider.configure([{default:{
      apiUrl: "http://198.58.120.167:3000/api",
      storage: "cookies",
			handleLoginResponse: function(response, $scope, headers) {
        console.log(headers);
        console.log(response);
        console.log($scope);
				$scope.user = response.data

        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        console.log(response);
        return response.data;
      },
//			parseExpiry: function(headers) {
//				// convert from UTC ruby (seconds) to UTC js (milliseconds)
//				console.log(headers);
//				return (parseInt(headers['expiry']) * 1000) || null;
//			}
   //tokenFormat: {
    //    "Authorization": "token={{ token }} expiry={{ expiry }} uid={{ uid }}"
     // }
 tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      }
     }
    }, {
    adminUser: {
      apiUrl: "http://198.58.120.167:3000/api",
      storage:               "cookies",
      signOutUrl:            '/admin_auth/sign_out',
      emailSignInPath:       '/admin_auth/sign_in',
      emailRegistrationPath: '/admin_auth',
      tokenValidationPath:   '/admin_auth/validate_token'
     }
    }])
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .when('/posts', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl',
        resolve: { auth: ['$auth', function($auth) { return $auth.validateUser(); }] }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
			.when('/sign_in', {
				templateUrl: 'views/auth/_login.html',
				controller: 'UserSessionCtrl'
			})
			.when('/admin/sign_in', {
				templateUrl: 'views/auth/_login.html',
				controller: 'AdminCtrl'
			})
			.when('/admin/sign_up', {
				templateUrl: 'views/auth/_register.html',
				controller: 'AdminCtrl'
			})
			.when('/sign_up', {
				templateUrl: 'views/auth/_register.html',
				controller: 'UserSessionCtrl'
			})
			.otherwise('/', {
					redirectTo: "/"
			})
});
app.run(['$rootScope', '$location', '$cookieStore','$http', function($rootScope, $location, $cookieStore, $auth, $http){
	$rootScope.$on('auth:login-success', function(ev, user, token) {
    $cookieStore.put('user', user);
    $cookieStore.put('token', token);
    $rootScope.user = $cookieStore.get('user');
    alert('Welcome ' +  user.email);
    $location.path('/home');
  });
  $rootScope.$on('auth:login-error', function(ev, reason) {
    alert('auth failed because '+ reason.errors[0]);
    });
  $rootScope.$on('auth:registration-email-error', function(ev, reason) {
    alert("Registration failed: " + reason.errors[0]);
    });
}]);
  app.factory('Post', ['$resource', function($resource, $auth) {
  return $resource('/api/posts/:id.json', null, {
    'update': { method:'PUT' },
  }); }])
