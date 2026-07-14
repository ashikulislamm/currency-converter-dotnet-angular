import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    @if (!dismissed()) {
      <div class="alert" [ngClass]="variantClass()" role="alert">
        <svg [lucideIcon]="iconName()" class="alert-icon"></svg>
        <div class="alert-content">
          @if (title()) {
            <h4 class="alert-title">{{ title() }}</h4>
          }
          <div class="alert-message">
            <ng-content></ng-content>
          </div>
        </div>
        @if (dismissible()) {
          <button type="button" class="alert-close" (click)="dismiss()" aria-label="Dismiss alert">
            <span aria-hidden="true">&times;</span>
          </button>
        }
      </div>
    }
  `,
  styles: [`
    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      border: 1px solid;
      border-radius: var(--radius-card);
      margin-bottom: var(--space-4);
      animation: fadeIn var(--transition-fast) forwards;
    }

    .alert-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .alert-content {
      flex-grow: 1;
    }

    .alert-title {
      font-size: var(--font-size-small);
      font-weight: 700;
      margin: 0 0 var(--space-1) 0;
    }

    .alert-message {
      font-size: var(--font-size-small);
      line-height: 1.4;
      opacity: 0.9;
    }

    .alert-close {
      background: none;
      border: none;
      font-size: 20px;
      line-height: 1;
      padding: 0;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.8;
      }
    }

    /* Variants */
    .alert-success {
      background-color: var(--color-success-light);
      border-color: rgba(22, 163, 74, 0.2);
      color: var(--color-success);
      .alert-title { color: #14532d; }
    }

    .alert-warning {
      background-color: var(--color-warning-light);
      border-color: rgba(245, 158, 11, 0.2);
      color: var(--color-warning);
      .alert-title { color: #78350f; }
    }

    .alert-error {
      background-color: var(--color-error-light);
      border-color: rgba(220, 38, 38, 0.2);
      color: var(--color-error);
      .alert-title { color: #7f1d1d; }
    }

    .alert-info {
      background-color: var(--color-info-light);
      border-color: rgba(14, 165, 233, 0.2);
      color: var(--color-info);
      .alert-title { color: #0c4a6e; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AlertComponent {
  readonly variant = input<'success' | 'warning' | 'error' | 'info'>('info');
  readonly title = input<string | null>(null);
  readonly dismissible = input<boolean>(false);
  readonly onClose = output<void>();

  protected dismissed = signal<boolean>(false);

  protected variantClass(): string {
    return `alert-${this.variant()}`;
  }

  protected iconName(): string {
    switch (this.variant()) {
      case 'success': return 'check-circle';
      case 'warning': return 'alert-triangle';
      case 'error': return 'alert-circle';
      case 'info':
      default: return 'info';
    }
  }

  protected dismiss(): void {
    this.dismissed.set(true);
    this.onClose.emit();
  }
}
