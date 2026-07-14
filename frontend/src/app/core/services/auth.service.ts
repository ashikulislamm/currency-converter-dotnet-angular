import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { ApiResponse, LoginResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly apiUrl = 'https://localhost:7118/api/auth';

  private readonly currentUserSignal = signal<User | null>(null);
  
  /**
   * Readonly signal of the current authenticated user profile.
   */
  readonly currentUser = this.currentUserSignal.asReadonly();
  
  /**
   * Computed signal checking if the user is currently authenticated.
   */
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    if (!this.isBrowser) {
      return;
    }

    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (token && userJson) {
      try {
        this.currentUserSignal.set(JSON.parse(userJson));
        // Proactively verify the token validity with the backend on app start
        this.getMe().subscribe({
          next: (res) => {
            if (res.success && res.data) {
              this.currentUserSignal.set(res.data);
              localStorage.setItem('user', JSON.stringify(res.data));
            }
          },
          error: () => {
            this.logout();
          }
        });
      } catch {
        this.logout();
      }
    }
  }

  /**
   * Retrieves the raw bearer token from local storage if running in the browser.
   */
  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('token');
  }

  /**
   * Sends user credentials to login. On success, stores JWT and redirects.
   */
  login(credentials: { username: string; password: string }): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.success && response.data) {
          if (this.isBrowser) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          this.currentUserSignal.set(response.data.user);
        }
      })
    );
  }

  /**
   * Fetches the current logged in user details from the backend claims.
   */
  getMe(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/me`);
  }

  /**
   * Completes the OAuth callback authentication flow.
   */
  handleCallback(token: string): Observable<ApiResponse<User>> {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
    return this.getMe().pipe(
      tap((response) => {
        if (response.success && response.data) {
          if (this.isBrowser) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          this.currentUserSignal.set(response.data);
        } else {
          this.logout();
        }
      })
    );
  }

  /**
   * Clears state and redirects to the login page.
   */
  logout(): void {
    const token = this.getToken();
    this.clearLocalSession();
    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
    }
  }

  private clearLocalSession(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }
}
