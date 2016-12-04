(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/templates/itemslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
