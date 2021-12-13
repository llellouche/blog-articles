import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): string | null {
    return localStorage.getItem('request_token');
  }

  public setToken(token: string): void {
    localStorage.setItem('request_token', token);
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    return !!this.getToken();
  }
}
