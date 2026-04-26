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
      // позже добавим другие страницы
      { path: 'employees', component: () => import('pages/EmployeesPage.vue') },
    ],
  },
];

export default routes;