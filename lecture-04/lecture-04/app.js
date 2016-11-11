(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', function ($scope) {
  $scope.name = "vitek";
  $scope.sayHello = function () {
    return "Hello Coursra";
  }
});

})();
