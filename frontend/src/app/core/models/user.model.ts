/**
 * Represents the authenticated user profile information.
 */
export interface User {
  username: string;
  displayName: string;
  role: string;
  email?: string;
  profilePicture?: string;
  provider?: string;
  loginMethod?: string;
}

/**
 * Represents the response payload returned by the login endpoint.
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Represents the standardized generic API wrapper response.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}
