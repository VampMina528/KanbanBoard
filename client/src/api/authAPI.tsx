const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type UserLogin = {
  email: string;
  password: string;
};

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorText = await response.text(); // fallback if .json() fails
      throw new Error(`Login failed: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export { login };
