import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/public.component').then(m => m.PublicComponent)
      },
      {
        path: 'secure',
        loadComponent: () => import('./features/secure/secure.component').then(m => m.SecureComponent),
        canActivate: [authGuard]
      },
      {
        path: 'currency-converter',
        loadComponent: () => import('./features/currency/currency.component').then(m => m.CurrencyComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./features/auth-callback/auth-callback.component').then(m => m.AuthCallbackComponent)
  },
  { path: '**', redirectTo: '' }
];
