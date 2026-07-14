import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="spinner" 
      [ngClass]="[sizeClass(), colorClass()]"
      role="status"
      aria-label="loading"
    ></div>
  `,
  styles: [`
    .spinner {
      display: inline-block;
      border-radius: 50%;
      border: 2px solid rgba(0, 0, 0, 0.05);
      border-top-color: transparent;
      animation: spin 0.6s linear infinite;
    }

    /* Sizes */
    .spinner-sm {
      width: 16px;
      height: 16px;
      border-width: 1.5px;
    }
    .spinner-md {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
    .spinner-lg {
      width: 40px;
      height: 40px;
      border-width: 3px;
    }

    /* Colors */
    .spinner-primary {
      border-top-color: var(--color-primary);
    }
    .spinner-white {
      border-top-color: #ffffff;
      border-left-color: rgba(255, 255, 255, 0.1);
      border-right-color: rgba(255, 255, 255, 0.1);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }
    .spinner-text-secondary {
      border-top-color: var(--color-text-secondary);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class SpinnerComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly color = input<'primary' | 'white' | 'text-secondary'>('primary');

  protected sizeClass(): string {
    return `spinner-${this.size()}`;
  }

  protected colorClass(): string {
    return `spinner-${this.color()}`;
  }
}
