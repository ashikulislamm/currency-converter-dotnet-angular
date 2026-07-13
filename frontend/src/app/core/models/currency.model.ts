/**
 * Represents a supported currency.
 */
export interface Currency {
  code: string;
  name: string;
}

/**
 * Represents the request payload for currency conversion.
 */
export interface ConvertRequest {
  from: string;
  to: string;
  amount: number;
}

/**
 * Represents the response payload returned upon a successful currency conversion.
 */
export interface ConvertResponse {
  from: string;
  to: string;
  originalAmount: number;
  exchangeRate: number;
  convertedAmount: number;
  timestamp: string;
}
