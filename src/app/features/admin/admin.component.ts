import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [
    MatButton,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    const token = this.authService.getToken();
    this.http.get<any[]>('http://localhost:3000/api/admin/users', {
      headers: { Authorization: token || '' }
    }).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Fehler beim Laden der Benutzer';
        this.showSnackBar(this.errorMessage, 'error');
      }
    });
  }

  confirmDelete(userId: number): void {
    if (confirm('Möchtest du diesen Benutzer wirklich löschen?')) {
      this.deleteUser(userId);
    }
  }

  deleteUser(userId: number): void {
    const token = this.authService.getToken();
    this.http.delete(`http://localhost:3000/api/admin/users/${userId}`, {
      headers: { Authorization: token || '' }
    }).subscribe({
      next: () => {
        this.successMessage = 'Benutzer erfolgreich gelöscht';
        this.showSnackBar(this.successMessage, 'success');
        this.loadUsers();
      },
      error: (error) => {
        this.errorMessage = 'Fehler beim Löschen des Benutzers';
        this.showSnackBar(this.errorMessage, 'error');
      }
    });
  }

  goBack(){
    this.router.navigate(['/inventory']);
  }

  showSnackBar(message: string, type: string): void {
    this.snackBar.open(message, 'Schliessen', {
      duration: 3000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error'
    });
  }
}
