import { Meteor } from 'meteor/meteor';
import { ChList } from '../imports/api/checklists';

Meteor.methods({
  setPosition : function(id, item, position) {
  	ChList.update({shop_id : id, 'questions.title' : item.title}, {
  		$inc : {
  			'questions.$.position' : position,
  		}
  	});
  }
});

var ChListApi = new Restivus({
  useDefaultAuth: false,
  prettyJson: true
});

ChListApi.addRoute('checklists', {authRequired: false}, {
  get: function () {
    return ChList.find({}).fetch();
  }
});