(function () {
'use strict';

angular.module('DataModule')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    })
    .then(function (results) {
      return results.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    return response;
  };

  service.getAllItemsForACategory = function (category) {
    var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + category)
    })
    .then(function (results) {
      return results.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    return response;
  };
}

})();
