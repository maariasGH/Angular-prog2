import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../api-url';

export interface LoginCredentials {
  usuario: string;
  password: string;
}

export interface AuthenticatedUser {
  id_usuario: number;
  usuario: string;
  rol: 'administrador' | 'vendedor';
}

export interface LoginResponse {
  success: boolean;
  mensaje: string;
  usuario?: AuthenticatedUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userStorageKey = 'usuarioAutenticado';
  private readonly userState = signal<AuthenticatedUser | null>(
    this.readStoredUser(),
  );

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}Login.php`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response.success && response.usuario) {
            sessionStorage.setItem(
              this.userStorageKey,
              JSON.stringify(response.usuario),
            );
            this.userState.set(response.usuario);
          }
        }),
      );
  }

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get currentUser(): AuthenticatedUser | null {
    return this.userState();
  }

  private readStoredUser(): AuthenticatedUser | null {
    const storedUser = sessionStorage.getItem(this.userStorageKey);
    if (!storedUser) {
      return null;
    }

    try {
      const user: unknown = JSON.parse(storedUser);
      if (
        typeof user === 'object' &&
        user !== null &&
        'id_usuario' in user &&
        'usuario' in user &&
        'rol' in user &&
        typeof user.id_usuario === 'number' &&
        typeof user.usuario === 'string' &&
        (user.rol === 'administrador' || user.rol === 'vendedor')
      ) {
        return user as AuthenticatedUser;
      }
    } catch {
      sessionStorage.removeItem(this.userStorageKey);
      return null;
    }

    sessionStorage.removeItem(this.userStorageKey);
    return null;
  }

  logout() {
    this.userState.set(null);
    sessionStorage.removeItem(this.userStorageKey);

    return this.http
      .post(`${API_URL}Logout.php`, {}, { withCredentials: true })
      .pipe(tap(() => sessionStorage.removeItem(this.userStorageKey)));
  }
}
