import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './shopsRemove.html';
import { Shops } from '../../../api/shops';

 
class ShopsRemove {

  constructor($reactive, $scope, $uibModal) {
    'ngInject';

    $reactive(this).attach($scope);

    this.open = function (shop) {

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'modalRemoveShop.html',
        controller: 'ShopModalInstanceCtrl',
        size: "sm",
        resolve: {
          shop: function () {
            return shop;
          }
        }
      });

      modalInstance.result.then((shop) => {
        Shops.update(shop._id, {$set : {active : 0}});
      });

    }
    
  }

}
 
const name = 'shopsRemove';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    shop: '<'
  },
  controllerAs: name,
  controller: ShopsRemove
}).controller('ShopModalInstanceCtrl', ["$scope", "$uibModalInstance", "shop", function ($scope, $uibModalInstance, shop) {

    $scope.shop = shop;

    $scope.ok = function () {
      $uibModalInstance.close($scope.shop);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);