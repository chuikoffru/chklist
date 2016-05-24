import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  addNewUser: function (data) {

  	let id;

    if (Roles.userIsInRole(Meteor.userId(), 'admin')) 
    {
      console.log("You are admin")
      id = Accounts.createUser(data);

      if(id) {
        Roles.setUserRoles(id, data.roles);
        console.log('YES');
      } else {
        console.log('NO');
      }
      
    } else {
      id = null;
      console.log('No permission');
    }

    return id;
  },
  getUserByEmail : function(email) {
    return _.pick(Accounts.findUserByEmail(email), '_id', 'profile', 'emails', 'roles');
  }
});