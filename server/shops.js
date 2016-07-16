import { Meteor } from 'meteor/meteor';
import { Shops } from '../imports/api/shops';
import { ChList } from '../imports/api/checklists';

var ShopsApi = new Restivus({
  useDefaultAuth: false,
  prettyJson: true
});

ShopsApi.addRoute('shops', {authRequired: false}, {
  get: function () {
    return Shops.find({}).fetch();
  }
});