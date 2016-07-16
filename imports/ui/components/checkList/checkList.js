import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularSanitize from 'angular-sanitize';
 
import { Meteor } from 'meteor/meteor';
import { Shops } from '../../../api/shops';
import { Reports } from '../../../api/reports';
import { ChList } from '../../../api/checklists';
import { Session } from 'meteor/session';
import { name as CheckEdit } from '../checkEdit/checkEdit';

import './checkList.html';
 
class CheckList {

  constructor($stateParams, $scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.activeTab = 0;

    this.startDate = new Date().getTime();
    
    this.shopId = $stateParams.shopId;

    this.checkitem = [];

    this.state = $state;

    this.subscribe('shops');
    this.subscribe('reports');
    this.subscribe('checklists');

    this.selected_user = Session.get('selected_user');
    this.selected_shop = Session.get('selected_shop');
    this.selected_report = Session.get('selected_report') || 0;

    this.helpers({
      shop: () => Shops.findOne({_id : this.getReactively('shopId')}),
      checklists: () => ChList.findOne({shop_id : this.shopId, name : this.selected_report.name}),
      user: () => Meteor.user()
    });
  }

  isDisabled(index) {
      if(this.checkitem[index].check == 0) {

        if(this.checkitem[index].reason.length > 6) {
          return false;
        } else {
          return true;
        }
      }
  }

  isComplete() {
    if(this.checklists) {

      let count_questions = this.checklists.questions.length;
      let count_answers = this.checkitem.length;
      console.log(count_answers + " / " + count_questions);
      return count_answers === count_questions ? true : false;
    }
  }

  report() {
    //console.log(this.checkitem);
    let data = {
      shop : _.pick(this.shop, '_id', 'name', 'address'),
      report : this.selected_report.name,
      user : this.selected_user,
      start : this.startDate,
      end : new Date().getTime(),
      data : this.checkitem
    }

    Reports.insert(data);
    
    Meteor.logout(() => {
      Session.set('selected_user', null);
      Session.set('selected_shop', null);
      this.state.go('users');
    });
    
  }

}
 
const name = 'checkList';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  CheckEdit
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: CheckList
}).config(config);

function config($stateProvider) {
  'ngInject';
 
  $stateProvider.state('checkList', {
    url: '/checklist/:shopId',
    template: '<check-list></check-list>'
  });
}