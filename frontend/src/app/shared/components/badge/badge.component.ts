import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="variantClass()">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 10px;
      font-size: var(--font-size-xs);
      font-weight: 600;
      border-radius: var(--radius-badge);
      letter-spacing: 0.02em;
      white-space: nowrap;
      text-transform: uppercase;
    }

    .badge-primary {
      background-color: var(--color-primary-light);
      color: var(--color-primary);
    }

    .badge-secondary {
      background-color: var(--color-border);
      color: var(--color-text-secondary);
    }

    .badge-success {
      background-color: var(--color-success-light);
      color: var(--color-success);
    }

    .badge-warning {
      background-color: var(--color-warning-light);
      color: var(--color-warning);
    }

    .badge-error {
      background-color: var(--color-error-light);
      color: var(--color-error);
    }

    .badge-info {
      background-color: var(--color-info-light);
      color: var(--color-info);
    }
  `]
})
export class BadgeComponent {
  readonly variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'>('secondary');

  protected variantClass(): string {
    return `badge-${this.variant()}`;
  }
}
