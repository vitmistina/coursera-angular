(function () {
"use strict";

angular.module('public')
.controller('SignUpFormController',SignUpFormController);

SignUpFormController.$inject = ['MenuService','UserDataService'];
function SignUpFormController(MenuService,UserDataService) {
  var $ctrl = this;
  $ctrl.invalidDish = false;

  $ctrl.submit = function () {
    MenuService.getAnItem($ctrl.user.favoriteDish)
    .then(function (response) {
      $ctrl.invalidDish = false;
      if (response.status !== 500) {
        UserDataService.setUserData($ctrl.user);
        $ctrl.completed=true;
      } else {
        $ctrl.invalidDish = true;
      }
    }).
    catch(function (error) {
      console.log("test item error:",error);
    });
  };

}
})();
