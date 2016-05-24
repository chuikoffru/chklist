import { Meteor } from 'meteor/meteor';
import { Shops } from '../imports/api/shops';

Meteor.methods({
  addQuestion : function(check, shop, question) {
    Shops.update({_id : shop._id, 'checklists.name' : check.name}, {$push : { 'checklists.$.questions' : question}});
  },
  removeQuestion : function(id, item) {
  	delete item.$$hashKey;
    Shops.update({_id : id._id, 'checklists.questions.title' : item.title}, {$pull : {'checklists.$.questions' : item}});
  },
  setPosition : function(id, item, position) {
  	console.log(id, item, position);
  	/*Shops.update({_id : id, 'checklists.questions.title' : item.title, 'checklists.questions.position' : item.position}, {
  		$inc : {
  			'checklists.$.questions.0.position' : position
  		}
  	});*/
  }
});