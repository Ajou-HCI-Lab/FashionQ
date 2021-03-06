/* eslint-disable prettier/prettier,no-unused-vars */
/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import DashboardPage from '../../../FashionQ_Project/front/src/views/Dashboard/Dashboard.js';
import TableList from '../../../FashionQ_Project/front/src/views/TableList/TableList.js';

const dashboardRoutes = [
  {
    path: '/',
    name: 'Style Check',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '',
  },
  {
    path: '/table',
    name: 'Style Result',
    rtlName: 'طباعة',
    icon: LibraryBooks,
    component: TableList,
    layout: '',
  },
];

export default dashboardRoutes;
