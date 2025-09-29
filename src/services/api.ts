// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * API Service using RTK Query
 * 
 * IMPORTANT: These are MOCK endpoints. Replace with your actual backend URLs.
 * 
 * Features:
 * - Automatic caching
 * - Automatic refetching
 * - Loading/error states
 * - TypeScript support
 */

// Get API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: string;
  user?: User;
}

interface CreatePasswordRequest {
  userId?: string;
  email: string;
  password: string;
}

interface CreatePasswordResponse {
  success: boolean;
  message: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

// ==========================================
// API SLICE
// ==========================================

export const api = createApi({
  reducerPath: 'api',
  
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    
    // Add authorization header if token exists
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  
  // Tag types for cache invalidation
  tagTypes: ['User', 'Auth'],
  
  // ==========================================
  // ENDPOINTS
  // ==========================================
  endpoints: (builder) => ({
    
    // REGISTER USER (Step 1: Register)
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      // Simulate success for demo (REMOVE THIS in production)
      // In production, remove this and let the actual API handle it
      transformResponse: (response: any) => {
        // Mock response - replace with actual API response
        return {
          success: true,
          message: 'Registration successful',
          userId: 'mock-user-id-123',
          user: {
            id: 'mock-user-id-123',
            ...response,
          },
        };
      },
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          message: response.data?.message || 'Registration failed',
        };
      },
    }),
    
    // CREATE PASSWORD (Step 2: Set password)
    createPassword: builder.mutation<CreatePasswordResponse, CreatePasswordRequest>({
      query: (passwordData) => ({
        url: '/auth/create-password',
        method: 'POST',
        body: passwordData,
      }),
      // Mock response
      transformResponse: (response: any) => {
        return {
          success: true,
          message: 'Password created successfully',
        };
      },
    }),
    
    // LOGIN (Step 3: Login)
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // Mock response
      transformResponse: (response: any) => {
        return {
          success: true,
          message: 'Login successful',
          token: 'mock-jwt-token-12345',
          user: {
            id: 'mock-user-id-123',
            firstName: 'John',
            lastName: 'Doe',
            email: response.email,
          },
        };
      },
      invalidatesTags: ['Auth'],
      
      // Store token on successful login
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        } catch (error) {
          // Handle error
          console.error('Login failed:', error);
        }
      },
    }),
    
    // LOGOUT
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // Clear local storage on logout
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        } catch (error) {
          // Still clear local storage even if API call fails
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      },
    }),
    
    // GET CURRENT USER
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    
    // ==========================================
    // ADD MORE ENDPOINTS HERE AS NEEDED
    // ==========================================
    // Example:
    // submitApplication: builder.mutation<ApplicationResponse, ApplicationData>({
    //   query: (data) => ({
    //     url: '/applications',
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    
  }),
});

// ==========================================
// EXPORT HOOKS
// ==========================================
// These hooks are auto-generated by RTK Query
// Use them in your components

export const {
  useRegisterMutation,
  useCreatePasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = api;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

/**
 * Get stored user data
 */
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Clear authentication data
 */
export const clearAuth = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};