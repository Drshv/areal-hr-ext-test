const routes = [
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'employees', component: () => import('pages/EmployeesPage.vue') },
      { path: 'departments', component: () => import('pages/DepartmentsPage.vue') },
      { path: 'organizations', component: () => import('pages/OrganizationsPage.vue') },
      { path: 'departments', component: () => import('pages/DepartmentsPage.vue') },
      { path: 'positions', component: () => import('pages/PositionsPage.vue') },
      { path: 'users', component: () => import('pages/UsersPage.vue') },
    ],
  },
];

export default routes;