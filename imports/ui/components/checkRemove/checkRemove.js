import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './checkRemove.html';
import { ChList } from '../../../api/checklists';

 
class CheckRemove {

  constructor($reactive, $scope, $uibModal) {
    'ngInject';

    $reactive(this).attach($scope);

    this.open = function (check) {

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'modalRemoveCheck.html',
        controller: 'CheckModalInstanceCtrl',
        size: "sm",
        resolve: {
          check: function () {
            return check;
          }
        }
      });

      modalInstance.result.then((check) => {
        ChList.update(check._id, {$set : {active : 0}});
      });

    }
    
  }

}
 
const name = 'checkRemove';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    check: '<'
  },
  controllerAs: name,
  controller: CheckRemove
}).controller('CheckModalInstanceCtrl', ["$scope", "$uibModalInstance", "check", function ($scope, $uibModalInstance, check) {

    $scope.check = check;

    $scope.ok = function () {
      $uibModalInstance.close($scope.check);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);