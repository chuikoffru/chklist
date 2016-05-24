import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as Dashboard } from '../imports/ui/components/dashboard/dashboard';
 
angular.module('chklist', [
  angularMeteor,
  Dashboard
]);