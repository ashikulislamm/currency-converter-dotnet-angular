import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { 
  provideLucideIcons, 
  LucideAlertCircle, 
  LucideCheckCircle, 
  LucideInfo, 
  LucideAlertTriangle, 
  LucideArrowLeftRight, 
  LucideLogOut, 
  LucideLock, 
  LucideUser, 
  LucideDollarSign, 
  LucideRefreshCw, 
  LucideTrendingUp, 
  LucideArrowRight, 
  LucideChevronRight,
  LucideTrendingDown,
  LucideShield,
  LucideGlobe,
  LucideEye,
  LucideEyeOff,
  LucideZap
} from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(withEventReplay()),
    provideLucideIcons(
      LucideAlertCircle, 
      LucideCheckCircle, 
      LucideInfo, 
      LucideAlertTriangle, 
      LucideArrowLeftRight, 
      LucideLogOut, 
      LucideLock, 
      LucideUser, 
      LucideDollarSign, 
      LucideRefreshCw, 
      LucideTrendingUp, 
      LucideArrowRight, 
      LucideChevronRight,
      LucideTrendingDown,
      LucideShield,
      LucideGlobe,
      LucideEye,
      LucideEyeOff,
      LucideZap
    )
  ]
};
