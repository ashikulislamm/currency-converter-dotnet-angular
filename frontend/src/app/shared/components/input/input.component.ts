import { Component, forwardRef, input, signal, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="input-wrapper" [class.has-icon]="icon()" [class.is-disabled]="disabled()" [class.has-toggle]="type() === 'password'">
      @if (icon()) {
        <svg [lucideIcon]="icon()!" class="input-icon"></svg>
      }
      <input
        [id]="id()"
        [type]="inputType()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [step]="step()"
        [min]="min()"
        (input)="onInput($event)"
        (blur)="onBlur()"
        class="custom-input"
        [class.is-invalid]="invalid()"
      />
      @if (type() === 'password') {
        <button
          type="button"
          class="password-toggle-btn"
          (click)="togglePasswordVisibility()"
          [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
        >
          <svg [lucideIcon]="showPassword() ? 'eye-off' : 'eye'" class="toggle-icon"></svg>
        </button>
      }
    </div>
  `,
  styles: [`
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .custom-input {
      width: 100%;
      padding: 12px 16px;
      font-family: var(--font-family);
      font-size: var(--font-size-body);
      color: var(--color-text-primary);
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-input);
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
      outline: none;

      &::placeholder {
        color: var(--color-text-secondary);
        opacity: 0.6;
      }

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 4px var(--color-primary-light);
      }

      &:disabled {
        background-color: var(--color-background);
        color: var(--color-text-secondary);
        cursor: not-allowed;
        opacity: 0.7;
      }
    }

    /* Has icon styling */
    .has-icon {
      .custom-input {
        padding-left: 44px;
      }
    }

    /* Has toggle styling */
    .has-toggle {
      .custom-input {
        padding-right: 44px;
      }
    }

    .input-icon {
      position: absolute;
      left: 16px;
      width: 18px;
      height: 18px;
      color: var(--color-text-secondary);
      pointer-events: none;
      opacity: 0.8;
      transition: color var(--transition-fast);
    }

    .custom-input:focus + .input-icon {
      color: var(--color-primary);
    }

    /* Password toggle button */
    .password-toggle-btn {
      position: absolute;
      right: 16px;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-secondary);
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color var(--transition-fast);
      z-index: 2;

      &:hover {
        color: var(--color-text-primary);
      }
    }

    .toggle-icon {
      width: 18px;
      height: 18px;
    }

    /* Invalid validation styling */
    .custom-input.is-invalid {
      border-color: var(--color-error);

      &:focus {
        box-shadow: 0 0 0 4px var(--color-error-light);
      }
    }

    .is-disabled {
      opacity: 0.7;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  readonly id = input<string>('');
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly icon = input<string | null>(null);
  readonly invalid = input<boolean>(false);
  readonly step = input<string | null>(null);
  readonly min = input<number | null>(null);

  protected value = signal<any>('');
  protected disabled = signal<boolean>(false);
  protected showPassword = signal<boolean>(false);

  protected inputType(): string {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  // Callbacks registered by the forms API
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Write a new value from the model to the view
  writeValue(value: any): void {
    this.value.set(value);
  }

  // Register callback to be triggered when value changes in UI
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register callback to be triggered when control is touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Set the disabled state of the control
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // Handle local UI input events
  onInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    let val: any = inputEl.value;
    if (this.type() === 'number') {
      val = val === '' ? null : Number(val);
    }
    this.value.set(val);
    this.onChange(val);
  }

  // Handle local UI blur events
  onBlur(): void {
    this.onTouched();
  }
}
