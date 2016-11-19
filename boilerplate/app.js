(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', MyFirstController)
.filter('notImportant',NotImportantFilter);

MyFirstController.$inject = ['$scope','notImportantFilter'];

function MyFirstController($scope,notImportantFilter) {
  $scope.sayMessage = function () {
    var message = "This is a very important message.";
    return message;
  };

  $scope.sayTheOtherMessage = function () {
    var message = "This is a very important message.";
    message = notImportantFilter(message);
    return message;
  };


};

function NotImportantFilter() {
  return function (input) {
    input = input || "";
    input = input.replace("very important", "not so much important");
    return input;
  };
}



})();
