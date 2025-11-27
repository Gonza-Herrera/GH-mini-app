import { Routes } from '@angular/router';
import { authGuard, authReverseGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [authReverseGuard],
    canMatch: [authReverseGuard],
    loadChildren: () =>
      import('./features/auth/login/login.routes').then(m => m.LOGIN_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    canMatch: [authGuard],
    loadComponent: () => import('./features/users/pages/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
  },

];
