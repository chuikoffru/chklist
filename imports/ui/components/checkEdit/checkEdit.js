import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import { Meteor } from 'meteor/meteor';
import { Shops } from '../../../api/shops';
import { Reports } from '../../../api/reports';
import { ChList } from '../../../api/checklists';
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
    this.subscribe('checklists');

    this.report = {};

    this.selected_user = Session.get('selected_user');
    this.selected_report = Session.get('selected_report');

    this.helpers({
      checklists: () => ChList.find({shop_id : this.shopId}),
      shop: () => Shops.findOne({_id : this.shopId}),
      user: () => Meteor.user(),
      questions: () => ChList.findOne({shop_id : this.shopId, name : this.getReactively('selected_report').name})
    });
  }

  addCheck() {
    this.newcheck.shop_id = this.shopId;
    this.newcheck.questions = [];
    this.newcheck.active = 1;
    ChList.insert(this.newcheck);
    this.newcheck = {name : ""};
  }

  selectCheck(index, check) {
      Session.set('selected_report', {index : index, name : check.name});
      this.selected_report = Session.get('selected_report');
  }

  setPosition(check, position) {
      Meteor.call('setPosition', this.shopId, check, position);
  }

  addQuestion() {

    let checkId = ChList.findOne({
      shop_id : this.shopId, 
      name : this.selected_report.name
    });

    if(checkId) {
      ChList.update(checkId._id, {
        $push : {
          questions : {
            $each : [this.question],
            $position: this.question.position
          }
        }
      });
    }

    this.question = {};
  }

  removeQuestion(check) {
    let checkId = ChList.findOne({
      shop_id : this.shopId, 
      name : this.selected_report.name
    });

    if(checkId) {
      ChList.update(checkId._id, {
        $pull : {
          questions : {title : check.title}
        }
      });
    }
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
