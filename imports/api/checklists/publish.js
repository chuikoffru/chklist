import { Meteor } from 'meteor/meteor';
 
import { ChList } from './collection';
 
if (Meteor.isServer) {
  Meteor.publish('checklists', function() {
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
 
    return ChList.find({});
  });
}
