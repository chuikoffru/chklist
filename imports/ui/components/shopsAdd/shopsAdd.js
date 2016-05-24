import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import './shopsAdd.html';
import { Shops } from '../../../api/shops';

 
class ShopsAdd {

  constructor($reactive, $scope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.shops = {};

    this.helpers({
      user() {
        return Meteor.user();
      }
    });
  }


 
  submit() {
    this.shops.owner = Meteor.user()._id;
    Shops.insert(this.shops);
    this.reset();
  }

  reset() {
  	this.shops = {};
  }
}
 
const name = 'shopsAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: ShopsAdd
});