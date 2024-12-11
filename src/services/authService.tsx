import { User } from '../interfaces/userType';
import GLOBAL from '../utils/global';

export const signup = async ({ username, password }: User) => {
  try {
    const response = await fetch(`${GLOBAL.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in sign up:', error);
    throw error;
  }
};

export const login = async ({ username, password }: User) => {
  try {
    const response = await fetch(`${GLOBAL.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // If response is not OK, try to get the error message from the response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error in login:', error);
    throw error;
  }
};

export const getUserData = async (token: string | null) => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const response = await fetch(`${GLOBAL.API_URL}/auth/user-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Get user data failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (token: string, userData: User) => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const response = await fetch(`${GLOBAL.API_URL}/auth/update-user-data`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update user data failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
