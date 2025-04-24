// file: src/routes/menuPageMap.js
import {
    Accounts,
    Customers,
    DashboardLayout,
    OrdersPage,
    MenuPage,
    RoleList,
    RoleDetail,
    UserManagerPage,
    UserRolePage,
    HomePage,
    ForbiddenPage,
  } from '../page'

  const menuPageMap = {
    // '/home': HomePage,
    // '/403': ForbiddenPage,
    // '/dashboard': DashboardLayout,
    '/accounts': Accounts,
    '/customers': Customers,
    '/orders': OrdersPage,
    '/menus': MenuPage,
    '/roles': RoleList,
    '/user-manager': UserManagerPage
  };
  

export default menuPageMap;
