import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import './successPage.html';

 
class SuccessPage {}
 
const name = 'successPage';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: SuccessPage
}).config(config);

function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('successPage', {
    url: '/success',
    template: '<success-page></success-page>'
  });
}