import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive, 
    LucideDynamicIcon, 
    BadgeComponent, 
    ButtonComponent
  ],
  template: `
    <header class="navbar-header">
      <div class="navbar-container">
        <!-- Logo & Branding -->
        <a routerLink="/" class="navbar-brand">
          <div class="brand-logo">
            <svg lucideIcon="dollar-sign" class="logo-icon"></svg>
          </div>
          <span class="brand-name">Currency Converter</span>
        </a>

        <!-- Navigation Links (Shown only if authenticated) -->
        @if (authService.isAuthenticated()) {
          <nav class="navbar-nav">
            <a 
              routerLink="/secure" 
              routerLinkActive="active" 
              class="nav-link"
            >
              Dashboard
            </a>
            <a 
              routerLink="/currency-converter" 
              routerLinkActive="active" 
              class="nav-link"
            >
              Converter
            </a>
          </nav>
        }

        <!-- Actions / User Info -->
        <div class="navbar-actions">
          @if (authService.isAuthenticated()) {
            <div class="user-info">
              <div class="user-meta">
                <span class="user-greeting">Signed in as</span>
                <span class="user-name">{{ authService.currentUser()?.displayName || 'User' }}</span>
              </div>
              <app-badge variant="primary">{{ authService.currentUser()?.role || 'Guest' }}</app-badge>
            </div>
            
            <app-button 
              variant="secondary" 
              (click)="onLogout()"
            >
              <svg lucideIcon="log-out" class="action-icon"></svg>
              <span>Logout</span>
            </app-button>
          } @else {
            <app-button 
              variant="primary" 
              routerLink="/login"
            >
              Log In
            </app-button>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar-header {
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(12px);
      border-b: 1px solid var(--color-border);
      background-color: rgba(255, 255, 255, 0.8);
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 72px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      text-decoration: none;
      color: var(--color-text-primary);
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.9;
      }
    }

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: var(--radius-input);
      background-color: var(--color-primary);
      color: #ffffff;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.15);
    }

    .logo-icon {
      width: 18px;
      height: 18px;
    }

    .brand-name {
      font-size: var(--font-size-card);
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    /* Nav Links */
    .navbar-nav {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      height: 100%;
      margin-left: var(--space-6);
      margin-right: auto;
    }

    .nav-link {
      display: flex;
      align-items: center;
      height: 72px;
      padding: 0 var(--space-2);
      font-size: var(--font-size-small);
      font-weight: 500;
      color: var(--color-text-secondary);
      border-bottom: 2px solid transparent;
      transition: color var(--transition-fast), border-color var(--transition-fast);

      &:hover {
        color: var(--color-text-primary);
      }

      &.active {
        color: var(--color-primary);
        border-bottom-color: var(--color-primary);
        font-weight: 600;
      }
    }

    /* Actions & User Profile */
    .navbar-actions {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding-right: var(--space-3);
      border-right: 1px solid var(--color-border);
    }

    .user-meta {
      display: flex;
      flex-direction: column;
      text-align: right;
    }

    .user-greeting {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }

    .user-name {
      font-size: var(--font-size-small);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .action-icon {
      width: 16px;
      height: 16px;
    }

    @media (max-width: 768px) {
      .navbar-nav {
        display: none; /* In production, we'd add a hamburger menu, but a top bar is fine */
      }
      .user-info {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  readonly authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
  }
}
