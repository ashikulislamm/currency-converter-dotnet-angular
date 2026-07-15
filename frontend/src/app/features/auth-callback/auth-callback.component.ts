import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div class="callback-container">
      <div class="callback-card">
        <app-spinner size="lg"></app-spinner>
        <h2>Authenticating...</h2>
        <p>Please wait while we complete your sign-in.</p>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      background-color: #F8FAFC;
      font-family: 'Inter', sans-serif;
    }
    .callback-card {
      background-color: #FFFFFF;
      padding: 40px;
      border-radius: 24px;
      box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
    h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      color: #0F172A;
      letter-spacing: -0.02em;
    }
    p {
      margin: 0;
      font-size: 15px;
      color: #64748B;
    }
  `]
})
export class AuthCallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
 
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
 
    const token = this.route.snapshot.queryParamMap.get('token');
 
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
 
    this.authService.handleCallback(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/secure']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: () => {
          this.router.navigate(['/login']);
        }
      });
  }
}
