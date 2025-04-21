import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp * 1000 < Date.now();
      }
      return false;
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('kanban_jwt') || '';
  }

  login(idToken: string) {
    localStorage.setItem('kanban_jwt', idToken);
    window.location.href = '/';
  }

  logout() {
    localStorage.removeItem('kanban_jwt');
    window.location.href = '/login';
  }
}

export default new AuthService();
