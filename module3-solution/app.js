(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        displayEmptyMessage: '<',
        onRemove: '&',
        title: '@',
        listIsLoading: '<'

      },
      controller: NarrowItDownDirectiveController,
      controllerAs: 'narrow',
      bindToController: true,
      link: NarrowItDownDirectiveLink
    };
    return ddo;
  }

  function NarrowItDownDirectiveLink(scope,elements,attrs,controller) {
    scope.$watch('narrow.checkIfListIsLoading()', function (newValue) {

      if (newValue === true) {
        displayLoader();
      } else {
        hideLoader();
      }
    });
    function displayLoader() {
      elements.find('div').css('display','block');
    }
    function hideLoader() {
      elements.find('div').css('display','none');
    }
  }

  function NarrowItDownDirectiveController() {
    var narrow = this;

    narrow.checkIfDisplayEmptyMessage = function () {
      if (narrow.displayEmptyMessage === true) {
        return true;
      } else {
        return false;
      }
    };

    narrow.checkIfListIsLoading = function () {
      if (narrow.listIsLoading) {
        return true;
      } else {
        return false;
      }
    };

  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;

    narrow.searchTerm = "";
    narrow.found = [];
    narrow.displayEmptyMessage = false;
    narrow.title = "Narrowed down list:";
    narrow.listIsLoading = false;

    narrow.narrowDown = function () {
      if (narrow.searchTerm.length > 0)
      {
        narrow.listIsLoading = true;
        MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
        .then(function (results) {
          narrow.found = results;
          narrow.setDisplayEmptyMessage();
          narrow.setTitle(narrow.found.length);
          narrow.listIsLoading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else {
        narrow.found = [];
        narrow.setDisplayEmptyMessage();
        narrow.setTitle(narrow.found.length);
        narrow.listIsLoading = false;
      }
    };

    narrow.setDisplayEmptyMessage = function () {
      if (narrow.found.length == 0) {
        narrow.displayEmptyMessage = true;
      } else {
        narrow.displayEmptyMessage = false;
      }
    };

    narrow.removeItem = function (index) {
      narrow.found.splice(index,1);
      narrow.setTitle(narrow.found.length);
    }

    narrow.setTitle = function (numberOfItems) {
      if (numberOfItems > 0) {
        narrow.title = "You've narrowed down to " + narrow.found.length + " item(s)";
      } else {
        narrow.title = "Narrowed down list:";
      }

    }

  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;


    service.getMatchedMenuItems = function (searchTerm) {
      service.found = [];

      var response =
      service.getAllMenuItems()
      .then(function (results) {
        for (var i = 0; i < results.menu_items.length; i++)
        {
          if (results.menu_items[i].description.indexOf(searchTerm) !== -1)
          {
            service.found.push(results.menu_items[i]);
          }
        }
        return service.found;
      })
      .catch(function (error) {
        console.log(error);
      });


      return response;
    };

    service.getAllMenuItems = function () {
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
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
