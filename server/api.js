import { Meteor } from 'meteor/meteor';
import { Shops } from '../imports/api/shops';

Meteor.methods({
  getUsers : function() {
    return Meteor.users();
  },
  getShops : function() {
      return Shops.find({});
  }
});