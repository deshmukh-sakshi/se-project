import api from './api';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export const authService = {
  async register(data: { 
    name: string; 
    phone?: string; 
    email?: string; 
    password: string; 
    role?: 'ADMIN' | 'CUSTOMER' 
  }) {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(identifier: string, password: string) {
    const response = await api.post<AuthResponse>('/auth/login', { identifier, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data.user;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'ADMIN';
  }
};
