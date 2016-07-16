import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Shops } from '../imports/api/shops';

import '../imports/api/reports';
import '../imports/api/shops';
import '../imports/api/users';
import '../imports/api/checklists';

Meteor.startup(() => {

  let userId;

  //Заполняем данные администратора
  if(Meteor.users.find({}).count() == 0) {

    userId = Accounts.createUser({
      "username" : "admin",
      "email" : "admin@admin.ru",
      "password" : "12345679"
    });

    Roles.addUsersToRoles(userId, 'admin');
  }

  //Заполняем данные магазинов
  if (Shops.find().count() === 0) {
    const shops = [{
      'name': 'Камчадалочка',
      'address': 'ул. Владивостокская, 47',
      "owner" : userId,
      'active' : 1,
    }, {
      'name': 'ТЦ Евразия',
      'address': 'ул. Кавказская, 49',
      "owner" : userId,
      'active' : 1
    }, {
      'name': 'ТЦ Вега',
      'address': 'ул. Пограничная, 13',
      "owner" : userId,
      'active' : 1
    }, {
      'name': 'Елизово',
      'address': 'ул. Ленина, 21',
      "owner" : userId,
      'active' : 1
    }];
 
    shops.forEach((shop) => {
      Shops.insert(shop)
    });
  }
});