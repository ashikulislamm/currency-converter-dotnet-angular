import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <div class="shell-layout">
      <!-- Shared Header & Navbar -->
      <app-navbar></app-navbar>

      <!-- Dynamic Content Injection -->
      <main class="shell-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Shared Premium Footer -->
      <footer class="shell-footer">
        <div class="footer-container">
          <p class="footer-copyright">&copy; 2026 Currency Converter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .shell-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      background-color: var(--color-background);
      position: relative;
    }

    .shell-content {
      flex: 1 0 auto;
      width: 100%;
    }

    .shell-footer {
      flex-shrink: 0;
      width: 100%;
      background-color: var(--color-surface);
      border-top: 1px solid var(--color-border);
      padding: var(--space-4) 0;
      margin-top: var(--space-6);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }

    .footer-copyright {
      font-size: var(--font-size-small);
      color: var(--color-text-secondary);
      margin: 0;
    }

    .footer-links {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      flex-wrap: wrap;
      justify-content: center;
    }

    .footer-link {
      font-size: var(--font-size-small);
      color: var(--color-text-secondary);
      transition: color var(--transition-fast);
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
      }
    }
  `]
})
export class ShellComponent {}
