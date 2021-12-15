import {Injectable} from '@angular/core';
import {User} from "../model/user";

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

  public getLoggedUser(): User | null {
    return this.isAuthenticated()
      ? new User(JSON.parse(localStorage.getItem('user') || '{}'))
      : null;
  }

  public setLoggedUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
