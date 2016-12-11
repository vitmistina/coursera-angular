(function () {
"use strict";

angular.module('public')
.service('UserDataService',UserDataService);


function UserDataService() {
  var service = this;

  service.user = {};

  service.setUserData = function (user) {
    service.user = user;
  };

  service.getUserData = function () {
    return service.user;
  };
}

})();
