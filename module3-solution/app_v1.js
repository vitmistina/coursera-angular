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
        onRemove: '&'
      },
      controller: NarrowItDownDirectiveController,
      controllerAs: 'narrow',
      bindToController: true,
      link: FoundItemsDirectiveLink
    };

    return ddo;
  }

  function FoundItemsDirectiveLink(scope,elements,attrs,controller) {


    function displayEmptyMessage() {
      elements.find('span').css('display','block');
    }

    function hideEmptyMessage() {

    }
  }

  function NarrowItDownDirectiveController() {
    var narrow = this;

    narrow.isEmpty = function () {
      if (narrow.found.length === 0 || narrow.searchTerm.lenght === 0) {
        console.log("is empty");
        return true;
      } else {
        console.log("is not empty");
        return false;
      }
    };
  }



  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.searchTerm = "";
    narrow.found = [];

    narrow.narrowDown = function () {
      if (narrow.searchTerm.length > 0)
      {
        MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
        .then(function (results) {
          narrow.found = results;

        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else {
        narrow.found = [];
      }
    };

    narrow.getStateOfLoading = function () {
      return MenuSearchService.isLoadingMatchedMenuItems;
    };

  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.isLoadingMatchedMenuItems = false;

    service.getMatchedMenuItems = function (searchTerm) {
      service.found = [];
      service.isLoadingMatchedMenuItems = true;

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
        service.isLoadingMatchedMenuItems = false;
        return service.found;
      })
      .catch(function (error) {
        console.log(error);
        service.isLoadingMatchedMenuItems = false;
      });


      return response;
    };

    service.getAllMenuItems = function () {
      var response = $http({
        method: "GET",
        url: "menu_items.json"
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
