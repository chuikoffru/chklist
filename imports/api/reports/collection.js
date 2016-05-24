import { Mongo } from 'meteor/mongo';
 
export const Reports = new Mongo.Collection('reports');

Reports.allow({
  insert(userId, report) {
    return true;
  },
  update(userId, report, fields, modifier) {
    return true;
  },
  remove(userId, report) {
    return true;
  }
});