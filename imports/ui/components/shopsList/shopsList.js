import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './shopsList.html';
import { Session } from 'meteor/session';
import { Shops } from '../../../api/shops';
import { ChList } from '../../../api/checklists';
import { name as ShopsAdd } from '../shopsAdd/shopsAdd';
import { name as ShopsRemove } from '../shopsRemove/shopsRemove';
import { name as CheckRemove } from '../checkRemove/checkRemove';
 
class ShopsList {
  constructor($scope, $reactive) {
    'ngInject';
 
    $reactive(this).attach($scope);

    this.subscribe('shops');
    this.subscribe('checklists');

    this.selected_user = Session.get('selected_user');
    this.selected_shop = Session.get('selected_shop');
 
    this.helpers({
      shops: () => Shops.find({active : 1}),
      user: () => Meteor.user(),
      reports: () => ChList.find({shop_id : this.getReactively('selected_shop'), active : 1})
    });
  }

  addCheck() {
    this.newcheck.shop_id = this.getReactively('selected_shop');
    this.newcheck.questions = [];
    this.newcheck.active = 1;
    ChList.insert(this.newcheck);
    this.newcheck = {name : ""};
  }

  checkInterval(item) {

    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    let start_hour = item.start.split(':')[0];
    let start_minute = item.start.split(':')[1];
    let end_hour = item.end.split(':')[0];
    let end_minute = item.end.split(':')[1];
    
      if(hour >= start_hour && hour <= end_hour) {
        return false;
      } else {
        return true;
      }

    //console.log(item.start, item.end);
  }

  select_shop(id) {
    Session.set('selected_shop', id);
    this.selected_shop = id;
  }

  select_report(index, check) {
    Session.set('selected_report', {index : index, name : check.name});
  }

}
 
const name = 'shopsList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ShopsAdd,
  ShopsRemove,
  CheckRemove
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: ShopsList
}).directive('uiSrefDisabled', ['$parse', '$rootScope',
  function($parse, $rootScope) {
    return {
      // this ensure eatClickIf be compiled before ngClick
      priority: 100,
      restrict: 'A',
      compile: function($element, attr) {
        var fn = $parse(attr.uiSrefDisabled);
        return {
          pre: function link(scope, element) {
            var eventName = 'click';
            element.on(eventName, function(event) {
              var callback = function() {
                if (fn(scope, {$event: event})) {
                  // prevents ng-click to be executed
                  event.stopImmediatePropagation();
                  // prevents href 
                  event.preventDefault();
                  return false;
                }
              };
              if ($rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          },
          post: function() {}
        }
      }
    }
  }
]).config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('shops', {
      url: '/shops',
      template: '<shops-list></shops-list>',
      resolve: {
           security: ['$q', function($q){
               if(!Session.get('selected_user')){
                  return $q.reject("Not Authorized");
               }
           }]
        }
    });
}