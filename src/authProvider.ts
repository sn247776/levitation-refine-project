import axios from 'axios';
import { AuthBindings } from '@refinedev/core';

export const TOKEN_KEY = 'refine-auth';

export const authProvider: AuthBindings = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      try {
        const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login', { username, email, password });
        console.log(response)
        const token = response.data.authToken;
        localStorage.setItem(TOKEN_KEY, token);
        return {
          success: true,
          redirectTo: '/',
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          error: {
            name: 'LoginError',
            message: 'Invalid username or password',
          },
        };
      }
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/300',
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
