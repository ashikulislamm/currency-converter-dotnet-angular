import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <button 
      [type]="type()" 
      [disabled]="disabled() || loading()" 
      class="btn" 
      [ngClass]="[variantClass(), fullWidth() ? 'w-full' : '']"
    >
      @if (loading()) {
        <app-spinner size="sm" color="white"></app-spinner>
      }
      <span class="btn-content" [class.loading-text]="loading()">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
      font-family: var(--font-family);
      font-size: var(--font-size-small);
      font-weight: 600;
      padding: 10px 20px;
      height: 42px;
      border: 1px solid transparent;
      border-radius: var(--radius-button);
      cursor: pointer;
      user-select: none;
      transition: background-color var(--transition-fast), border-color var(--transition-fast), 
                  transform var(--transition-fast), box-shadow var(--transition-fast);
      outline: none;
      position: relative;
    }

    .btn-content {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    .loading-text {
      opacity: 0.8;
    }

    /* Primary Button: Solid Blue */
    .btn-primary {
      background-color: var(--color-primary);
      color: #ffffff;

      &:hover:not(:disabled) {
        background-color: var(--color-primary-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-primary-light), 0 0 0 4px var(--color-primary);
      }
    }

    /* Secondary Button: White with Border */
    .btn-secondary {
      background-color: var(--color-surface);
      border-color: var(--color-border);
      color: var(--color-secondary);

      &:hover:not(:disabled) {
        background-color: var(--color-background);
        border-color: var(--color-border-hover);
        color: var(--color-text-primary);
        transform: translateY(-1px);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-border), 0 0 0 4px var(--color-text-secondary);
      }
    }

    /* Ghost Button: Transparent background */
    .btn-ghost {
      background-color: transparent;
      color: var(--color-text-secondary);

      &:hover:not(:disabled) {
        background-color: var(--color-background);
        color: var(--color-text-primary);
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px var(--color-border);
      }
    }

    /* Disabled State */
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .w-full {
      width: 100%;
    }
  `]
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);

  protected variantClass(): string {
    return `btn-${this.variant()}`;
  }
}
