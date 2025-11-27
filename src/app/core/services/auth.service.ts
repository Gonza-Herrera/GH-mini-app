import { Injectable, signal } from '@angular/core';

const KEY = 'user_email';

@Injectable({ providedIn: 'root' })

export class AuthService {
  readonly email = signal<string | null>(sessionStorage.getItem(KEY));
  readonly isLogged = signal<boolean>(!!this.email());

  login(email: string) {
    sessionStorage.setItem(KEY, email);
    this.email.set(email);
    this.isLogged.set(true);
  }

  logout() {
    sessionStorage.removeItem(KEY);
    this.email.set(null);
    this.isLogged.set(false);
  }
}
