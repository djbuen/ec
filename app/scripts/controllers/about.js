'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
