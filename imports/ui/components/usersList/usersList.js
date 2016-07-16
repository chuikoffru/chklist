import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { name as  UsersAdd } from '../usersAdd/usersAdd';
import { name as  UsersRemove } from '../usersRemove/usersRemove';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Reports } from '../../../api/reports';
import { Shops } from '../../../api/shops';
import { ChList } from '../../../api/checklists';

import './usersList.html';
 
class UsersList {

  constructor($scope, $reactive, $state) {
    'ngInject';
 
    $reactive(this).attach($scope);

    this.subscribe('users');
    this.subscribe('reports');
    this.subscribe('shops');
    this.subscribe('checklists');

    this.state = $state;
 
    this.helpers({
      users: () => Meteor.users.find({roles : {$in : ['user']}}),
      reports: () => Reports.find({}, {sort : {end : -1}, limit : 10}),
      shops: () => Shops.find({}),
      user: () => Meteor.user()
    });
  }

  select_user(email) {
    Meteor.call('getUserByEmail', email, (err, result) => {
      Session.set('selected_user', result);
      this.state.go('shops');
    });
  }

  alertMe(report) {
    const shop = Shops.findOne({_id : report.shop._id});

    if(shop) {

      let chk = ChList.findOne({shop_id : report.shop._id, name : report.report});

      if(chk) {
        let start = moment(report.start).format('HH');
        let end = moment(report.end).format('HH');

        let start_hour = chk.start.split(':')[0];
        let end_hour = chk.end.split(':')[0];

        if(start >= start_hour && end <= end_hour) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  getShop(id) {
    return _.findWhere(this.shops, {_id : id});
  }

  checkSuccess(id) {

    let report = _.findWhere(this.reports, {_id: id});
    let i = 0;

    _.each(report.data, (item) => {
      if(item.check == 1) {
        i++;
      }
      //console.log(i + " / " + report.data.length);
    });

    return i === report.data.length ? true : false;

  }

}
 
const name = 'usersList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  UsersAdd,
  UsersRemove
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: UsersList
}).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('users', {
      url: '/',
      template: '<users-list></users-list>'
    });
}