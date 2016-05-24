import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import './usersAdd.html';

 
class UsersAdd {

  constructor($reactive, $scope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.newuser = {};

    this.helpers({
      user() {
        return Meteor.user();
      }
    });
    
  }
 
  submit() {
    Meteor.call('addNewUser', this.newuser, function(err, result){
      console.log(result);
    });
    this.reset();
  }

  reset() {
  	this.newuser = {};
  }
}
 
const name = 'usersAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: UsersAdd
});