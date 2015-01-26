'use strict';

describe('Controller: AuthAuthctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('blogApp'));

  var AuthAuthctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthAuthctrlCtrl = $controller('AuthAuthctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
