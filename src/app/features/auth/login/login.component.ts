import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    NgIf,
    MatButton,
    MatInput,
    MatFormField,
    FormsModule,
    MatLabel
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const loginData = {email: this.email, password: this.password};
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        console.log('✅ Erfolgreich eingeloggt:', response);
        this.router.navigate(['/inventory']);
      },
      error: (error) => {
        console.error('❌ Fehler beim Login:', error.error);
        this.errorMessage = 'Falsche E-Mail oder Passwort';
      }
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
