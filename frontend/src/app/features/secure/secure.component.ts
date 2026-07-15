import { Component, inject, signal, DestroyRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LucideDynamicIcon } from '@lucide/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ButtonComponent, 
    CardComponent, 
    BadgeComponent, 
    SpinnerComponent, 
    AlertComponent, 
    LucideDynamicIcon
  ],
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.scss'
})
export class SecureComponent {
  readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly isRefreshing = signal<boolean>(false);
  readonly errorLoading = signal<string | null>(null);

  refreshProfile(): void {
    this.isRefreshing.set(true);
    this.errorLoading.set(null);

    this.authService.getMe()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isRefreshing.set(false);
          if (!response.success) {
            this.errorLoading.set(response.message || 'Failed to sync claims.');
          }
        },
        error: (err) => {
          this.isRefreshing.set(false);
          this.errorLoading.set(err.error?.message || 'An error occurred while syncing profile data.');
        }
      });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
