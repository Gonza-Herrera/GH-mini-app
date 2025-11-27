import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.routes').then(m => m.LOGIN_ROUTES),
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/pages/user-list.component').then(m => m.UserListComponent)
  },

];

