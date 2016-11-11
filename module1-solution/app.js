(function () {
'use strict';

angular.module('LunchCheckApp', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.list = "";
  $scope.redOrGreen = "";

  $scope.displayMessage = function () {
    var amountOfListItems = calculateNumberOfListItems($scope.list);
    if (amountOfListItems == 0) {
      $scope.message = "Please enter data first";
      $scope.redOrGreen = "red";
    }
    else if (amountOfListItems <= 3) {
      $scope.message = "Enjoy!";
      $scope.redOrGreen = "green";
    }
    else if (amountOfListItems > 3) {
      $scope.message = "Too much!";
      $scope.redOrGreen = "green";
    }
  };

  function calculateNumberOfListItems(string) {
    return string.replace(/\s/g, '').split(',').filter(Boolean).length;
  };




};


})();
