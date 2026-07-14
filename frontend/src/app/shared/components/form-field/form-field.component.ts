import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-field">
      @if (label()) {
        <label [for]="forId()" class="form-label" [class.is-invalid]="invalid()">
          {{ label() }}
        </label>
      }
      
      <div class="form-control-container">
        <ng-content></ng-content>
      </div>

      @if (invalid() && error()) {
        <div class="form-error" role="alert">
          {{ error() }}
        </div>
      }
    </div>
  `,
  styles: [`
    .form-field {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      width: 100%;
      margin-bottom: var(--space-3);
    }

    .form-label {
      font-size: var(--font-size-small);
      font-weight: 600;
      color: var(--color-text-secondary);
      transition: color var(--transition-fast);

      &.is-invalid {
        color: var(--color-error);
      }
    }

    .form-control-container {
      position: relative;
    }

    .form-error {
      font-size: var(--font-size-xs);
      font-weight: 500;
      color: var(--color-error);
      margin-top: 4px;
      padding-left: 2px;
      animation: slideDown var(--transition-fast) forwards;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-2px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class FormFieldComponent {
  readonly label = input<string | null>(null);
  readonly forId = input<string>('');
  readonly error = input<string | null>(null);
  readonly invalid = input<boolean>(false);
}
