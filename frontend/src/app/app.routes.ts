import { Routes } from '@angular/router';
import { PublicComponent } from './features/public/public.component';
import { LoginComponent } from './features/login/login.component';
import { SecureComponent } from './features/secure/secure.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: PublicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
