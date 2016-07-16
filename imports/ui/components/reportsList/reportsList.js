import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Reports } from '../../../api/reports';
import { Shops } from '../../../api/shops';
import { ChList } from '../../../api/checklists';

import './reportsList.html';
 
class ReportsList {

  constructor($scope, $reactive, $state, $stateParams) {
    'ngInject';
 
    $reactive(this).attach($scope);

    this.currentPage = 1;
    this.perPage = 10;
    this.sort = {
      datetime : 1
    };

    this.subscribe('users');
    this.subscribe('checklists');

    this.subscribe('fullReports', () => [{
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('currentPage') - 1) * this.perPage),
      sort: this.getReactively('sort')}
    ]);

    this.subscribe('shops');

    this.state = $state;
    
 
    this.helpers({
      users: () => Meteor.users.find({}),
      reports: () => Reports.find({}, {
          sort : this.getReactively('sort')
        }),
      shops: () => Shops.find({}),
      oneReport: () => Reports.findOne({_id : $stateParams.id})
    });
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
 
const name = 'reportsList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: ReportsList
}).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('reportsList', {
      url: '/reports/:id',
      template: '<reports-list></reports-list>',
      resolve: {
           security: ['$q', function($q){
               if(Meteor.user().roles[0] != 'admin'){
                  return $q.reject("Not Authorized");
               }
           }]
        }
    });
}