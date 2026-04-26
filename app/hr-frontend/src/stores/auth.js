import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(login, password) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login, password }),
        });

        if (!response.ok) throw new Error('Login failed');

        const data = await response.json();
        this.token = data.access_token;
        localStorage.setItem('token', this.token);
        await this.getProfile();
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    async getProfile() {
      if (!this.token) return;
      try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (response.ok) {
          this.user = await response.json();
        }
      } catch (error) {
        console.error('Profile error:', error);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});