(function () {
'use strict';

angular.module('myFirstApp', [])

.controller('MyFirstController', MyFirstController)
.filter('notImportant',NotImportantFilter)
.filter('truth',TruthFilter);

MyFirstController.$inject = ['$scope','notImportantFilter'];

function MyFirstController($scope,notImportantFilter) {
  $scope.text ="";
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

function TruthFilter() {
  return function (input,target,replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  };
}



})();
