import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../core/services/currency.service';
import { AuthService } from '../../core/services/auth.service';
import { Currency, ConvertResponse } from '../../core/models/currency.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../../shared/layout/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink,
    NavbarComponent,
    ButtonComponent,
    CardComponent,
    SpinnerComponent,
    AlertComponent,
    InputComponent,
    FormFieldComponent,
    LucideDynamicIcon
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly currencyService = inject(CurrencyService);
  readonly authService = inject(AuthService);

  readonly currencies = signal<Currency[]>([]);
  readonly isLoadingCurrencies = signal<boolean>(true);
  readonly isConverting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successResult = signal<ConvertResponse | null>(null);

  readonly convertForm: FormGroup = this.fb.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    amount: [100, [Validators.required, Validators.min(0.01)]]
  });

  ngOnInit(): void {
    this.loadCurrencies();
  }

  loadCurrencies(): void {
    this.isLoadingCurrencies.set(true);
    this.errorMessage.set(null);

    this.currencyService.getCurrencies().subscribe({
      next: (response) => {
        this.isLoadingCurrencies.set(false);
        if (response.success && response.data) {
          this.currencies.set(response.data);
          
          // Select default values USD to EUR
          const codes = response.data.map(c => c.code);
          const defaultFrom = codes.includes('USD') ? 'USD' : (codes[0] || '');
          const defaultTo = codes.includes('EUR') ? 'EUR' : (codes[1] || '');
          
          this.convertForm.patchValue({
            from: defaultFrom,
            to: defaultTo
          });
        } else {
          this.errorMessage.set(response.message || 'Failed to retrieve supported currencies.');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingCurrencies.set(false);
        this.errorMessage.set(err.error?.message || 'An error occurred while loading currencies.');
      }
    });
  }

  onSubmit(): void {
    if (this.convertForm.invalid) {
      this.convertForm.markAllAsTouched();
      return;
    }

    const { from, to, amount } = this.convertForm.value;

    if (from === to) {
      this.errorMessage.set('Source and destination currencies must be different.');
      this.successResult.set(null);
      return;
    }

    this.isConverting.set(true);
    this.errorMessage.set(null);
    this.successResult.set(null);

    this.currencyService.convert({ from, to, amount }).subscribe({
      next: (response) => {
        this.isConverting.set(false);
        if (response.success && response.data) {
          this.successResult.set(response.data);
        } else {
          this.errorMessage.set(response.message || 'Conversion failed.');
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isConverting.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to complete currency conversion.');
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.convertForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  swapCurrencies(): void {
    const from = this.convertForm.get('from')?.value;
    const to = this.convertForm.get('to')?.value;
    
    this.convertForm.patchValue({
      from: to,
      to: from
    });
    
    if (this.successResult()) {
      this.successResult.set(null);
    }
  }
}
