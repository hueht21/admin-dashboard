// file: src/routes/menuPageMap.js
import {
  Accounts,
  Customers,
  OrdersPage,
  MenuPage,
  RoleList,
  UserManagerPage,
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
  '/user-manager': UserManagerPage,
}

export default menuPageMap
