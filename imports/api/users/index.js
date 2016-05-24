import { Meteor } from 'meteor/meteor';

Meteor.users.allow({
  insert(userId) {
    return true;
  },
  update(userId, fields, modifier) {
    return true;
  }
});
 
if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({});
  });

  Meteor.publish('usersList', function() {
    return Meteor.users.find({
    	roles : {$in : "user"}
    });
  });
}