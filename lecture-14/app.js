(function () {
'use strict';

angular.module('CounterApp', [])

.controller('CounterContoller', CounterController)

CounterController.$inject = ['$scope','$timeout'];

function CounterController($scope,$timeout) {
  $scope.counter = 0;

  $scope.upCounter = function () {
    $timeout(function () {
      $scope.counter++;
      console.log("Counter incremented");
    }, 2000);

  };

  // $scope.upCounter = function () {
  //   setTimeout(function () {
  //     $scope.$apply(function functionName() {
  //       $scope.counter++;
  //       console.log("Counter incremented");
  //     });
  //   }, 2000);
  //
  // };

  // $scope.upCounter = function () {
  //   setTimeout(function () {
  //     $scope.counter++;
  //     console.log("Counter incremented");
  //     $scope.$digest();
  //   }, 2000);
  //
  // };



}




})();
