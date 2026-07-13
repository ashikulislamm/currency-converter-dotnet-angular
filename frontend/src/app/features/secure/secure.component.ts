import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './secure.component.html'
})
export class SecureComponent implements OnInit {
  readonly authService = inject(AuthService);
  
  readonly userProfile = signal<User | null>(null);
  readonly isLoadingProfile = signal<boolean>(true);
  readonly errorLoading = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoadingProfile.set(true);
    this.errorLoading.set(null);

    this.authService.getMe().subscribe({
      next: (response) => {
        this.isLoadingProfile.set(false);
        if (response.success && response.data) {
          this.userProfile.set(response.data);
        } else {
          this.errorLoading.set(response.message || 'Failed to retrieve profile data.');
        }
      },
      error: (err) => {
        this.isLoadingProfile.set(false);
        this.errorLoading.set(err.message || 'An error occurred while calling the backend profile API.');
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
