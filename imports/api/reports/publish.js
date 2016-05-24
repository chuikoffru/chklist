import { Meteor } from 'meteor/meteor';
 
import { Reports } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('reports', function(options) { 
    return Reports.find({});
  });

  Meteor.publish('fullReports', function(options) {
    const selector = {};
    return Reports.find(selector, options);
  });
}
