import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
})
export class AppComponent {
  title = 'AngPHP';
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  get isLoginPage(): boolean {
    return this.router.url.split('?')[0] === '/login';
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => void this.router.navigate(['/home']),
      error: (error) => {
        console.error('No se pudo cerrar la sesión en el servidor:', error);
        void this.router.navigate(['/home']);
      },
    });
  }
}
