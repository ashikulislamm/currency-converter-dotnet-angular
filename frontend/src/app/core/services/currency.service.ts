import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/user.model';
import { Currency, ConvertRequest, ConvertResponse } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7118/api/currency';

  /**
   * Fetches all supported currencies from the backend API.
   */
  getCurrencies(): Observable<ApiResponse<Currency[]>> {
    return this.http.get<ApiResponse<Currency[]>>(`${this.apiUrl}/currencies`);
  }

  /**
   * Submits a currency conversion request to the backend API.
   * @param request The conversion payload containing from, to, and amount.
   */
  convert(request: ConvertRequest): Observable<ApiResponse<ConvertResponse>> {
    return this.http.post<ApiResponse<ConvertResponse>>(`${this.apiUrl}/convert`, request);
  }
}
