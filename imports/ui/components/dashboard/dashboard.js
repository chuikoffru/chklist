import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import uiTwbs from 'angular-ui-bootstrap';

import './dashboard.html';
import { name as Navigation } from '../navigation/navigation';
import { name as ShopsList } from '../shopsList/shopsList';
import { name as CheckList } from '../checkList/checkList';
import { name as UsersList } from '../usersList/usersList';
import { name as ReportsList } from '../reportsList/reportsList';

class DashBoard {}

const name = 'dashboard';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Navigation,
  ShopsList,
  CheckList,
  UsersList,
  ReportsList,
  'accounts.ui',
  uiTwbs
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: DashBoard
}).config(config);
 
function config($locationProvider, $urlRouterProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/');
}