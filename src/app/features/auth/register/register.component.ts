import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    FormsModule,
    MatFormField,
    NgIf,
    MatButton,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: ''
  };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.authService.register(this.formData).subscribe({
      next: (response) => {
        console.log('✅ Registrierung erfolgreich:', response);

        this.toastr.success('Registrierung erfolgreich! Du kannst dich jetzt einloggen.', 'Erfolg');

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('❌ Fehler bei der Registrierung:', error.error);
        this.errorMessage = 'Registrierung fehlgeschlagen. Versuche es erneut.';

        this.toastr.error('Registrierung fehlgeschlagen. Versuche es erneut.', 'Fehler');
      }
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
