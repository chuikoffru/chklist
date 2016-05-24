import { Meteor } from 'meteor/meteor';
 
import { Shops } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('shops', function() {
    /*const selector = {
      $or: [{
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }]
    };*/
 
    return Shops.find({});
  });
}
