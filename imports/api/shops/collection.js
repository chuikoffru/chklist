import { Mongo } from 'meteor/mongo';
 
export const Shops = new Mongo.Collection('shops');

Shops.allow({
  insert(userId, shop) {
    return true;//userId && shop.owner === userId;
  },
  update(userId, shop, fields, modifier) {
    return true;//userId && shop.owner === userId;
  },
  remove(userId, shop) {
    return true; // userId && shop.owner === userId;
  }
});