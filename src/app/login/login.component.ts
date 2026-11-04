import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.formBuilder.nonNullable.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = false;
  errorMessage = '';

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (response) => {
        this.loading = false;
        if (!response.success) {
          this.errorMessage = response.mensaje || 'Credenciales incorrectas.';
          return;
        }

        void this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        const backendMessage =
          typeof error.error === 'object' &&
          error.error !== null &&
          'mensaje' in error.error &&
          typeof error.error.mensaje === 'string'
            ? error.error.mensaje
            : null;
        this.errorMessage =
          error.status === 0
            ? 'No se pudo conectar con el servidor. Verificá que Apache y MySQL estén activos.'
            : backendMessage ?? 'Ocurrió un error al iniciar sesión. Intentá nuevamente.';
      },
    });
  }
}
