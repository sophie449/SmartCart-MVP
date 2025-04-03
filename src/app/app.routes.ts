import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';


export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Willkommen' }
  },
  {
  path: 'admin',
  loadComponent: () =>
  import('./features/admin/admin.component').then(m => m.AdminComponent),
  canActivate: [AdminGuard]
},

  {
    path: 'inventory',
    loadComponent: () =>
      import('./features/inventory/inventory.component').then((m) => m.InventoryComponent),
    data: { title: 'Vorräte verwalten' },
    canActivate: [AuthGuard]
  },
  {
    path: 'recipe',
    loadComponent: () =>
      import('./features/recipe/recipe.component').then(m => m.RecipeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/error-page/error-page.component').then((m) => m.ErrorPageComponent),
    data: { title: 'Seite nicht gefunden', errorCode: '404', errorMessage: 'Seite nicht gefunden' }
  }
];
