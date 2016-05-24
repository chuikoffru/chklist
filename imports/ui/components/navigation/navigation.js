import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Reports } from '../../../api/reports';
import { Shops } from '../../../api/shops';

import { name as AuthForm } from '../authForm/authForm';

import './navigation.html';

class Navigation {
	constructor($stateParams, $scope, $reactive) {
	    'ngInject';

	    $reactive(this).attach($scope);

	    this.helpers({
		   selected_user: () => {

		   	if(Meteor.user() && !Session.get('selected_user')) {
		   		Meteor.call('getUserByEmail', Meteor.user().emails[0].address, (err, result) => {

		   			//console.log(result);

			    	if(result.roles[0] == 'user') {
			    		Session.set('selected_user', result);
			    		return Session.get('selected_user');
			    	} else {
			    		return null;
			    	}
      		
    			});
		   	} else {
		   		return Session.get('selected_user');
		   	}

		   },
		   selected_shop: () => Shops.findOne(Session.get('selected_shop'))
		});


	}
}

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  AuthForm
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: Navigation
});