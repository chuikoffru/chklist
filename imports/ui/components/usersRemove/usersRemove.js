import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './usersRemove.html';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


class UsersRemove {

  constructor($reactive, $scope, $uibModal) {
    'ngInject';

    $reactive(this).attach($scope);

    this.open = function (user) {

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'modalRemoveUser.html',
        controller: 'UserModalInstanceCtrl',
        size: "sm",
        resolve: {
          user: function () {
            return user;
          }
        }
      });

      modalInstance.result.then((user) => {
        Roles.setUserRoles(user._id, 'unactive');
      });

    }
    
  }
}

const name = 'usersRemove';

// create a module
export default angular.module(name, [
  angularMeteor
  ]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      user: '<'
    },
    controllerAs: name,
    controller: UsersRemove
  }).controller('UserModalInstanceCtrl', ["$scope", "$uibModalInstance", "user", function ($scope, $uibModalInstance, user) {

    $scope.user = user;

    $scope.ok = function () {
      $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);
