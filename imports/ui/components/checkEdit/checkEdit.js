import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import { Meteor } from 'meteor/meteor';
import { Shops } from '../../../api/shops';
import { Reports } from '../../../api/reports';
import { Session } from 'meteor/session';

import './checkEdit.html';
 
class CheckEdit {

  constructor($stateParams, $scope, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.shopId = $stateParams.shopId;

    this.newcheck = {
      name : "",
      questions : []
    }

    this.state = $state;

    this.subscribe('shops');
    this.subscribe('reports');

    this.report = {};

    this.selected_user = Session.get('selected_user');
    this.selected_report = Session.get('selected_report');

    this.helpers({
      shop: () => Shops.findOne({_id : this.shopId}),
      user: () => Meteor.user(),
      reportdata: () => {
        const data = Shops.findOne({_id : this.shopId});
        if(data) {
          this.report = data.checklists[this.getReactively('selected_report').index]; 
        } 
      }
    });
  }

  addCheck() {
    Shops.update({_id : this.shop._id}, {$push : {checklists : this.newcheck}});
    this.newcheck = {name : ""};
  }

  selectCheck(index, check) {
      Session.set('selected_report', {index : index, name : check.name});
      this.selected_report = Session.get('selected_report');
  }

  setPosition(item, position) {
    Meteor.call('setPosition', this.shopId, item, position);
  }

  addQuestion() {
    Meteor.call('addQuestion', this.selected_report, this.shop, this.question);
    this.question = {};
  }

  removeQuestion(idx) {
    //console.log(idx);
    Meteor.call('removeQuestion', this.shop, idx);
    //this.question = {};
  }

  onUCWidgetReady(data) {
    //console.log(data);
  }

  onUCUploadComplete(info) {
    //console.log(info);
  }

}
 
const name = 'checkEdit';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  'ng-uploadcare'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: CheckEdit
});
