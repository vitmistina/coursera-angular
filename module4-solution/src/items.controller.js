(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController(MenuDataService, items) {
  var itemsList = this;
  itemsList.items = items;
  console.log(items);
}

})();
