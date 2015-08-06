'use strict';

/**
 * @ngdoc function
 * @name ecApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ecApp
 */
angular.module('ecApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
