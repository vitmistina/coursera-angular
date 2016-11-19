(function () {
'use strict';

var shoppingList1 = ["Milk","donuts","bread","eggplant","trees"];

var shoppingList2 = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "donuts",
    quantity: "200"
  },
  {
    name: "bread",
    quantity: "1"
  },
  {
    name: "eggplant",
    quantity: "32"
  },
  {
    name: "trees",
    quantity: "50"
  }
];

angular.module('myFirstApp', [])
.controller('MyFirstController', MyFirstController);

MyFirstController.$inject = ['$scope'];

function MyFirstController($scope) {
  $scope.shoppingList1 = shoppingList1;
  $scope.shoppingList2 = shoppingList2;

  $scope.addToList = function () {
    var newItem = {
      name: $scope.newItemName,
      quantity: $scope.newItemQuantity
    };
    $scope.shoppingList2.push(newItem);
  };
};



})();
