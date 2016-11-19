(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showToBuyList = this;

  showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  showToBuyList.buy = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showAlreadyBoughtList = this;
  showAlreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    {
      name: "cookies",
      quantity: "10 bags"
    },
    {
      name: "milk",
      quantity: "5 bottles"
    },
    {
      name: "bread",
      quantity: "1 loaf"
    },
    {
      name: "water",
      quantity: "3 bottles"
    },
    {
      name: "icecream",
      quantity: "10 cups"
    }
  ];
  var alreadyBoughtItems = [];

  service.buyItem = function (index) {
    var item = toBuyItems[index];
    toBuyItems.splice(index,1);
    alreadyBoughtItems.push(item);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

}

})();
