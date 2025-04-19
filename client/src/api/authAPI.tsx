const API_BASE_URL = import.meta.env.VITE_API_URL;
type UserLogin = {
  email: string;
  password: string;
};

const login = async (userInfo: UserLogin) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export { login };
