import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './authForm.html';
 
class AuthForm {

  constructor($stateParams, $scope, $reactive, $state) {
    'ngInject';


    $reactive(this).attach($scope);

    this.state = $state;


    this.helpers({
      user: () => Meteor.user()
    });

    

  }

  login() {
    Meteor.loginWithPassword(this.email, this.password);
  }

  logout() {
    Meteor.logout(() => {
      Session.set('selected_user', null);
      Session.set('selected_shop', null);
      this.state.go('users');
    });
  }

}
 
const name = 'authForm';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: AuthForm
});
